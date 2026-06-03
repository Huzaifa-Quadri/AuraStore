import cron from "node-cron";
import TempUpload from "../model/tempUpload.model.js";
import { deleteFile } from "./storage.service.js";

const ORPHAN_AGE_HOURS = 24;

// Find temp uploads older than the cutoff, delete the file from ImageKit, then the row.
export const sweepOrphanUploads = async () => {
  const cutoff = new Date(Date.now() - ORPHAN_AGE_HOURS * 60 * 60 * 1000);
  const orphans = await TempUpload.find({ createdAt: { $lt: cutoff } });

  for (const orphan of orphans) {
    try {
      await deleteFile(orphan.fileId);   // remove from ImageKit
      await orphan.deleteOne();          // remove the tracking row
    } catch (err) {
      // Log and continue — a single failure shouldn't stop the whole sweep.
      console.error(`Failed to sweep orphan ${orphan.fileId}:`, err.message);
    }
  }
};

// Run once an hour. Call startCleanupJob() once at server startup.
export const startCleanupJob = () => {
  cron.schedule("0 * * * *", () => {
    sweepOrphanUploads().catch((e) => console.error("Cleanup job error:", e));
  });
};