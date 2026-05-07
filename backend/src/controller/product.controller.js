import { HTTP_STATUS } from "../config/constants.js";
import ProductModel from "../model/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadFile} from "../services/storage.service.js"

export const createProduct = asyncHandler(async (req, res)=> {
  const {title, description, priceAmount, priceCurrency} = req.body;

  const images = await Promise.all(req.files.map(async (file) => {
    return await uploadFile({
      buffer: file.buffer, 
      fileName: file.originalname,
    });
  }));

  const product = await ProductModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    },
    seller: req.seller._id,
    image: {
      url: images[0].url,
      alt: title,
    },
  });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Product created successfully",
    product,
  })
});

export const getAllSellerProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({seller: req.seller._id});

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Products fetched successfully",
    products,
  })
});

