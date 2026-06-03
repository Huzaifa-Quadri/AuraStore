import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Product Image is Mandatory"],
    },
    alt: {
      type: String,
      default: "",
    },
    fileId: {
      type: String,
      required: [true, "Image fileId is required"],
    },
    isThumbnail: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const priceSchema = new mongoose.Schema(
  {
    amount:   { type: Number, required: [true, "Price amount is required"] },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP", "JPY", "PKR"],
      default: "INR",
    },
  },
  { _id: false },
);

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
    price: priceSchema,
    images: {
      type: [imageSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one product image is required",
      },
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Product Category is Mandatory"],
      enum: ["Electronics", "Clothing", "Books", "Home", "Beauty", "Sports", "Other"], 
    },
    brand: {
      type: String,
      required: [true, "Product Brand is Mandatory"],
    },

    variants: [
      {
        images: {
          type: [imageSchema],
          default: [],
        },
        stock : {
          type: Number,
          // required: [true, "Product Variant Stock is Mandatory"],
          default: 0,
        },

        attributes: {  //can haave different attributes for different products, so using Map. Exp - Cores, colors, size, 
          type: Map,
          of: String,
        },

        price: priceSchema, //variant can have different price than main product
      }
    ]
    // rating: {
    //   type: Number,
    //   required: [true, "Product Rating is Mandatory"],
    // },
    // numReviews: {
    //   type: Number,
    //   required: [true, "Product Number of Reviews is Mandatory"],
    // },

  },
  {
    timestamps: true,
  },
);
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
