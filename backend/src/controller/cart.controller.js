import productModel from "../model/product.model.js";
import cartModel from "../model/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../config/constants.js";

/**
 * Resolve the variant (if any) the caller is asking for, and derive the price /
 * stock / attributes that apply to it.
 *
 * A product either has variants (the buyer must pick one) or is a legacy/simple
 * product with none (variantId stays null and we fall back to the product's own
 * price and stock).
 */
const resolveSelection = (product, variantId) => {
  const variant = variantId ? product.variants.id(variantId) : null;

  // Caller sent a variantId that isn't on this product.
  if (variantId && !variant) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Variant not found for this product");
  }
  // Product has variants but the caller didn't choose one — ambiguous.
  if (!variantId && product.variants.length > 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Please select a variant for this product");
  }

  return {
    variant,
    price: variant ? variant.price : product.price,
    stock: Number(variant ? variant.stock : product.stock) || 0,
    attributes: variant ? variant.attributes : undefined,
  };
};

/** Find the user's cart, creating an empty one on first use. */
const getOrCreateCart = async (userId) => {
  const existing = await cartModel.findOne({ user: userId });
  if (existing) return existing;
  return cartModel.create({ user: userId, items: [] });
};

/** Locate an existing line for the same product + variant combination. */
const findLineIndex = (cart, productId, variantId) =>
  cart.items.findIndex(
    (item) =>
      item.product.toString() === productId.toString() &&
      // Normalise both sides so null (legacy product) compares cleanly.
      String(item.variantId ?? "") === String(variantId ?? ""),
  );

/**
 * @route  POST /api/cart
 * @desc   Add an item to the cart, or increment it if that exact
 *         product + variant is already there.
 * @body   { productId, variantId?, quantity? }
 * @access Private
 */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, variantId = null } = req.body;
  // quantity is optional — default to 1. Without this, an omitted quantity would
  // make every stock comparison NaN and silently skip the checks below.
  const qty = Number(req.body.quantity) || 1;

  const product = await productModel.findById(productId);
  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Product not found");
  }

  const { price, stock, attributes } = resolveSelection(product, variantId);

  if (stock <= 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "This item is out of stock");
  }

  const cart = await getOrCreateCart(req.user._id);
  const index = findLineIndex(cart, productId, variantId);

  if (index > -1) {
    const line = cart.items[index];
    const newQuantity = line.quantity + qty;

    if (newQuantity > stock) {
      const remaining = Math.max(0, stock - line.quantity);
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `Insufficient stock. Only ${remaining} more can be added — you already have ${line.quantity} in your cart.`,
      );
    }

    line.quantity = newQuantity;
    line.priceAtAdd = price; // keep the cached price fresh
  } else {
    if (qty > stock) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `Insufficient stock. Only ${stock} unit(s) available.`,
      );
    }

    cart.items.push({
      product: productId,
      variantId,
      attributes,
      priceAtAdd: price, // the VARIANT's price when a variant was chosen
      quantity: qty,
    });
  }

  await cart.save();

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: index > -1 ? "Cart quantity updated" : "Product added to cart",
    cart,
  });
});

/**
 * @route  GET /api/cart
 * @desc   Return the user's cart. Re-checks every line against live product data
 *         so a seller's price change, stock drop, or deleted variant is caught
 *         here rather than surprising the buyer at payment. Refreshed prices are
 *         written back, and each line is flagged so the UI can warn the user.
 * @access Private
 */
const getCart = asyncHandler(async (req, res) => {
  const cart = await cartModel.findOne({ user: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Cart is empty",
      data: [],
    });
  }

  // Fetch every referenced product in ONE query instead of one per line.
  const products = await productModel.find({
    _id: { $in: cart.items.map((item) => item.product) },
  });
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  let priceChanged = false;

  const data = cart.items.map((item) => {
    const product = productMap.get(item.product.toString());

    // The seller deleted the whole product while it sat in the cart.
    if (!product) {
      return {
        _id: item._id,
        product: null,
        variantId: item.variantId,
        attributes: item.attributes,
        price: item.priceAtAdd,
        quantity: item.quantity,
        available: false,
        reason: "This product is no longer available",
      };
    }

    const variant = item.variantId ? product.variants.id(item.variantId) : null;

    // The seller deleted just this variant — the attributes snapshot is what
    // still lets us show the buyer which option they had picked.
    if (item.variantId && !variant) {
      return {
        _id: item._id,
        product,
        variantId: item.variantId,
        attributes: item.attributes,
        price: item.priceAtAdd,
        quantity: item.quantity,
        available: false,
        reason: "This variant is no longer available",
      };
    }

    const livePrice = variant ? variant.price : product.price;
    const liveStock = Number(variant ? variant.stock : product.stock) || 0;

    // Sync the cached price so the next render is accurate too.
    if (livePrice?.amount !== item.priceAtAdd?.amount) {
      item.priceAtAdd = livePrice;
      priceChanged = true;
    }

    return {
      _id: item._id,
      product,
      variantId: item.variantId,
      attributes: item.attributes,
      price: livePrice,
      quantity: item.quantity,
      available: liveStock >= item.quantity,
      reason: liveStock >= item.quantity
        ? null
        : liveStock === 0
          ? "Out of stock"
          : `Only ${liveStock} left — please reduce the quantity`,
    };
  });

  if (priceChanged) await cart.save();

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Cart retrieved successfully",
    priceChanged, // let the UI toast "some prices were updated"
    data,
  });
});

/**
 * @route  PATCH /api/cart/items/:id
 * @desc   Change the quantity of one existing cart line.
 * @body   { quantity }
 * @access Private
 */
const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const cart = await cartModel.findOne({ user: req.user._id });
  const item = cart?.items.id(id);
  if (!item) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Cart item not found");
  }

  const product = await productModel.findById(item.product);
  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "This product is no longer available");
  }

  // Check against LIVE stock, not whatever was true when the item was added.
  const variant = item.variantId ? product.variants.id(item.variantId) : null;
  const stock = Number(variant ? variant.stock : product.stock) || 0;

  if (quantity > stock) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, `Only ${stock} unit(s) available.`);
  }

  item.quantity = quantity;
  await cart.save();

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Cart item updated",
    cart,
  });
});

/**
 * @route  DELETE /api/cart/items/:id
 * @desc   Remove a single line from the cart.
 * @access Private
 */
const removeCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cart = await cartModel.findOne({ user: req.user._id });
  const item = cart?.items.id(id);
  if (!item) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Cart item not found");
  }

  item.deleteOne(); // removes this subdocument from cart.items
  await cart.save();

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Item removed from cart",
    cart,
  });
});

/**
 * @route  DELETE /api/cart
 * @desc   Empty the whole cart (post-checkout, or a "Clear cart" button).
 * @access Private
 */
const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { items: [] },
    { returnDocument: "after" },
  );

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Cart cleared",
    cart: cart || { user: req.user._id, items: [] },
  });
});

export { addToCart, getCart, updateCartItem, removeCartItem, clearCart };
