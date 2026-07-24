import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const cartSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  // Points at the _id of a subdocument in product.variants[] — NOT a Mongoose
  // ref (variants aren't a top-level collection, so populate() can't reach them).
  // Resolve manually: product.variants.id(variantId). null for legacy/variant-less products.
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  // Snapshot of the chosen variant's attributes (e.g. {Color: "Red", Size: "M"}) taken
  // at add-to-cart time, so the line still renders even if the seller edits/deletes
  // that variant later. Mirrors variant.attributes' type (free-form keys per product).
  attributes: {
    type: Map,
    of: String
  },
  // Cached for display only — refreshed whenever the cart is read, and never trusted
  // for the actual charge (checkout always re-derives the live price/stock).
  priceAtAdd: {
    type: priceSchema,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, { timestamps: true });

// One line per distinct item per user: enables "add to cart" to upsert + $inc
// quantity instead of creating duplicate rows for the same product/variant.
cartSchema.index({ user: 1, product: 1, variantId: 1 }, { unique: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;