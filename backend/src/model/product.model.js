import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product Name is Mandatory"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is Mandatory"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is Mandatory"],
    },
    price: {
      amount: {
        type: Number,
        required: [true, "Product Price is Mandatory"],
      },
      currency: {
        type: String,
        enum: ["INR", "USD", "EUR", "GBP", "JPY", "PKR"],
        default: "INR",
      },
    },
    image: {
      url: {
        type: String,
        required: [true, "Product Image is Mandatory"],
      },
      alt: {
        type: String,
        required: [true, "Product Image Alt is Mandatory"],
      },
    },
    // category: {
    //   type: String,
    //   required: [true, "Product Category is Mandatory"],
    // },
    // brand: {
    //   type: String,
    //   required: [true, "Product Brand is Mandatory"],
    // },
    // rating: {
    //   type: Number,
    //   required: [true, "Product Rating is Mandatory"],
    // },
    // numReviews: {
    //   type: Number,
    //   required: [true, "Product Number of Reviews is Mandatory"],
    // },
    // stock: {
    //   type: Number,
    //   required: [true, "Product Stock is Mandatory"],
    // },
  },
  {
    timestamps: true,
  },
);
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
