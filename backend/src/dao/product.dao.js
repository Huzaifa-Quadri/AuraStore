import productModel from "../model/product.model.js";

export const getProductById = async (productId) => {
  const product = await productModel.findById(productId);
  return product;
}

export const stockOfVariant = async (productId, variantId) => {
  const product = await productModel.findOne({ _id: productId, "variants._id": variantId });
  

  const stock = product.variants.find(variant => variant._id.toString() === variantId.toString()).stock;

  return stock;
}

