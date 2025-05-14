import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMultipleImage = async (req: any, res: any) => {
  try {
    const imageUrls = await Promise.all(
      req.files.map((file: Express.Multer.File) =>
        cloudinary.uploader.upload(file.path)
      )
    );

    const urls = imageUrls.map((result) => result.secure_url);
    res.json({ urls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Failed to upload images" });
  }
};
