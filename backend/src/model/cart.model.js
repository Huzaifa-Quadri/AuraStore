import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

/**
 * One line in the cart. Kept as a subdocument so a user's whole cart lives in a
 * single document: fetching the cart is one query, and emptying it after
 * checkout is one operation.
 *
 * Each item keeps its own _id (Mongoose adds it by default) so the update /
 * remove endpoints can target a single line: PATCH /api/cart/items/:itemId.
 */
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    // Points at the _id of a subdocument in product.variants[] — NOT a Mongoose
    // ref (variants aren't a top-level collection, so populate() can't reach them).
    // Resolve manually: product.variants.id(variantId).
    // null = a legacy/simple product that has no variants at all.
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    // Snapshot of the chosen variant's attributes (e.g. {Color: "Red", Size: "M"})
    // taken at add-to-cart time, so the line still renders even if the seller
    // edits or deletes that variant later.
    attributes: {
      type: Map,
      of: String,
    },
    // Cached for display only — refreshed whenever the cart is read, and never
    // trusted for the actual charge (checkout always re-derives the live price).
    priceAtAdd: {
      type: priceSchema,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { timestamps: true },
);

const cartSchema = new mongoose.Schema(
  {
    // unique → the database itself guarantees a user can never end up with two
    // cart documents, no matter how many concurrent requests come in.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
