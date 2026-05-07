import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

export const uploadFile = async ({buffer, fileName, folder='snitch'}) => {
  const response = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName: fileName,
    folder: folder
  });
  return response;
};

