import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();

const storage = new GridFsStorage({
  url: process.env.DB_URI,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    console.log("Received file data:", file);

    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
