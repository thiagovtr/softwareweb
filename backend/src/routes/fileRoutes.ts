import { Router } from "express";
import multer from "multer";
import { prisma } from "../configs/prisma";
import { CreateFileController } from "../controllers/CreateFileController";
import { ListFilesController } from "../controllers/ListFilesController";
import { LikeFileController } from "../controllers/LikeFileController";
import multerConfig from "../configs/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { DeleteFileController } from "../controllers/DeleteFileController";

const createFileController = new CreateFileController();
const listFilesController = new ListFilesController();
const likeFileController = new LikeFileController();
const deleteFileController = new DeleteFileController();
const fileRoutes = Router();
const upload = multer(multerConfig);

fileRoutes.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  createFileController.handle,
);

fileRoutes.get("/", listFilesController.handle);

fileRoutes.get("/:id", async (request, response) => {
  const { id } = request.params;

  const file = await prisma.file.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      subject: true,

      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!file) {
    return response.status(404).json({
      error: "Arquivo não encontrado",
    });
  }

  return response.json({
    ...file,

    likes: await prisma.like.count({
      where: {
        fileId: file.id,
      },
    }),

    url: `http://localhost:3333/uploads/${file.filename}`,
  });
});

fileRoutes.post("/:id/like", isAuthenticated, likeFileController.handle);

fileRoutes.delete("/:id", isAuthenticated, deleteFileController.handle);

export { fileRoutes };
