import { Router } from "express";
import multer from "multer";
import { prisma } from "../configs/prisma";
import { CreateFileController } from "../controllers/CreateFileController";
import { ListFilesController } from "../controllers/ListFilesController";
import { LikeFileController } from "../controllers/LikeFileController";
import { DeleteFileController } from "../controllers/DeleteFileController";
import { UpdateFileController } from "../controllers/UpdateFileController";
import multerConfig from "../configs/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateCommentController } from "../controllers/CreateCommentController";
import { ListCommentsController } from "../controllers/ListCommentsController";

const createFileController = new CreateFileController();
const listFilesController = new ListFilesController();
const likeFileController = new LikeFileController();
const deleteFileController = new DeleteFileController();
const updateFileController = new UpdateFileController();
const createCommentController = new CreateCommentController();
const listCommentsController = new ListCommentsController();
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

fileRoutes.put("/:id", isAuthenticated, updateFileController.handle);

fileRoutes.delete("/:id", isAuthenticated, deleteFileController.handle);

fileRoutes.post(
  "/:id/comments",
  isAuthenticated,
  createCommentController.handle,
);

fileRoutes.get("/:id/comments", listCommentsController.handle);

export { fileRoutes };
