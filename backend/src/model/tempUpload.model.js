//* This tiny collection is the glue that gives us ownership checks and orphan cleanup.

import mongoose from "mongoose";

//* One row per file uploaded in Phase 1 that has NOT yet been used in a product.
//* When a product is created (Phase 2) we delete the matching rows ("confirmed").
//* Anything left here longer than the cleanup window is an orphan and gets swept.

const tempUploadSchema = new mongoose.Schema({
  fileId:{
    type: String,
    required: [true, "Image fileId is required"],
    index: true, // for faster lookups when confirming or cleaning up
  },
  url:{
    type: String,
    required: [true, "Image URL is required"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // for faster cleanup by seller
  },
},
  {
    timestamps: true
  }
);

const TempUploadModel = mongoose.model("TempUpload", tempUploadSchema);

export default TempUploadModel;

//? Why not a MongoDB TTL index? A TTL index can auto-delete the database row after N seconds, but it cannot call ImageKit to delete the actual file. So we use a normal collection and a small scheduled job (Section 11) that does both: delete the file from ImageKit, then delete the row.