import { Router } from "express";
import multer from "multer";
import { CreateFileController } from "../controllers/CreateFileController";
import { ListFilesController } from "../controllers/ListFilesController";
import { LikeFileController } from "../controllers/LikeFileController";

import multerConfig from "../configs/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const createFileController = new CreateFileController();
const listFilesController = new ListFilesController();
const likeFileController = new LikeFileController();

const fileRoutes = Router();

const upload = multer(multerConfig);

fileRoutes.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  createFileController.handle,
);

fileRoutes.get("/", listFilesController.handle);

fileRoutes.post("/:id/like", isAuthenticated, likeFileController.handle);

export { fileRoutes };
