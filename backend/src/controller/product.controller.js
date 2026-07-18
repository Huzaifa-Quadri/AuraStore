import { HTTP_STATUS } from "../config/constants.js";
import ProductModel from "../model/product.model.js";
import TempUploadModel from "../model/tempUpload.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadFile, deleteFile } from "../services/storage.service.js";

/**
 * PHASE 1 — Upload images only. No product is created here.
 * Input : multipart/form-data, field "images" = one or more files
 * Output: [{ url, fileId, name }, ...]
 *
 * Guarantees: either ALL files upload (and are tracked), or NONE remain in ImageKit.
 */
export const uploadProductImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "No image files provided");
  }

  const uploaded = [];

  try {
    for (const file of req.files) {
      const result = await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });

      uploaded.push({
        url: result.url,
        fileId: result.fileId,
        name: file.originalname,
      });
    }

    await TempUploadModel.insertMany(
      uploaded.map((item) => ({
        fileId: item.fileId,
        url: item.url,
        seller: req.seller._id,
      })),
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Images uploaded successfully",
      images: uploaded,
    });
  } catch (error) {
    // ROLLBACK: an upload (or the insertMany) failed. Delete everything we already
    // pushed to ImageKit so we don't leak orphan files. allSettled = try every delete
    // even if some fail; one failed delete must not abort the others.
    await Promise.allSettled(uploaded.map((itm) => deleteFile(itm.fileId)));
    throw error; // let the global errorHandler format the response
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    brand,
    stock,
    images,
    variants = [],
  } = req.body;

  const incommingFields = [
    ...images.map((img) => img.fileId),
    ...variants.flatMap((v) => (v.images || []).map((img) => img.fileId)),
  ];

  const ownedRows = await TempUploadModel.find({
    seller : req.seller._id,
    fileId: { $in: incommingFields },
  }).select("fileId");

  const ownedIds = new Set(ownedRows.map((r)=> r.fileId));
  const notOwned = incommingFields.filter((id)=> !ownedIds.has(id));

  if (notOwned.length > 0) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Some Images were not Uploaded by you or have expired. Re-upload or try again.");
  }

  const product = await ProductModel.create({
    title,
    description,
    price,
    category,
    brand,
    stock,
    seller: req.seller._id,
    images,
    variants,
  });

  // These files are now confirmed (used by a real product). Remove their temp
  // rows so the cleanup job never deletes them as orphans.
  await TempUploadModel.deleteMany({
    seller: req.seller._id,
    fileId: { $in: incommingFields },
  });

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});
// export const createProduct = asyncHandler(async (req, res)=> {
//   const {title, description, priceAmount, priceCurrency} = req.body;

//   const images = await Promise.all(req.files.map(async (file) => {
//     return await uploadFile({
//       buffer: file.buffer,
//       fileName: file.originalname,
//     });
//   }));

//   const product = await ProductModel.create({
//     title,
//     description,
//     price: {
//       amount: priceAmount,
//       currency: priceCurrency || "INR",
//     },
//     seller: req.seller._id,
//     image: {
//       url: images[0].url,
//       alt: title,
//     },
//   });

//   res.status(HTTP_STATUS.CREATED).json({
//     success: true,
//     message: "Product created successfully",
//     product,
//   })
// });

export const getAllSellerProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({ seller: req.seller._id });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  
  if (!product) throw new ApiError(HTTP_STATUS.NOT_FOUND, "Product not found");

  res.status(HTTP_STATUS.OK).json({ success: true, product });
});
