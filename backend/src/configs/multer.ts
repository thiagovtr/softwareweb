import multer from "multer";
import path from "path";
import crypto from "crypto";
import slugify from "slugify";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),

    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString("hex");

      const extension = path.extname(file.originalname);

      const fileNameWithoutExtension = path.basename(
        file.originalname,
        extension,
      );

      const sanitizedName = slugify(fileNameWithoutExtension, {
        lower: true,
        strict: true,
      });

      const filename = `${hash}-${sanitizedName}${extension}`;

      callback(null, filename);
    },
  }),

  limits: {
    fileSize: 100 * 1024 * 1024,
  },
};
