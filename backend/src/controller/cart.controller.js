import productModel from "../model/product.model.js";
import cartModel from "../model/cart.model.js";
import { stockOfVariant } from "../dao/product.dao.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../config/constants.js";


const addToCart = asyncHandler(async (req, res) => {
  const { productId, variantId } = req.params;
  const { quantity } = req.body;

  const product = await productModel.findOne({ _id: productId, "variants._id": variantId });

  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Product or variant not found");
  }

  const variant = product.variants.find(variant => variant._id.toString() === variantId.toString());

  const cart = await cartModel.findOne({ user: req.user._id }) || await cartModel.create({ user: req.user._id });

  const productAlreadyInCart = await cartModel.findOne({ user: req.user._id, product: productId, variantId });

  if (productAlreadyInCart) {
    if(variant.stock < productAlreadyInCart.quantity + quantity) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Insufficient stock; Only"+ (variant.stock - productAlreadyInCart.quantity) + " units available. You have already added " + productAlreadyInCart.quantity + " to your cart.");
    }

    await cartModel.findOneAndUpdate(
      { user: req.user._id, product: productId, variantId },
      { $inc: { "items.$.quantity": quantity }},
      { new: true }
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Product quantity updated in cart",
    });
  }

  if(quantity > variant.stock) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: "Insufficient stock; Only " + variant.stock + " units available.",
    });
  }

  cart.items.push({
    product: productId,
    variantId,
    attributes: variant.attributes,
    priceAtAdd: product.price,
    quantity,
  });

  await cart.save();

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Product added to cart successfully",
  });
});

const getCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = await cartModel.findOne({ user: user._id }).populate("items.product");

  if (!cart) {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Cart is empty",
      data: [],
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Cart retrieved successfully",
    data: cart.items,
  });
});

export { addToCart, getCart };