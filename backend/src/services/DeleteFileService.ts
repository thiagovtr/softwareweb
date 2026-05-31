import fs from "fs";
import path from "path";

import { prisma } from "../configs/prisma";
import { AppError } from "../errors/AppError";

interface DeleteFileRequest {
  fileId: number;
  userId: number;
}

class DeleteFileService {
  async execute({ fileId, userId }: DeleteFileRequest) {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      throw new AppError("Arquivo não encontrado");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (file.userId !== userId && !user?.isAdmin) {
      throw new AppError("Sem permissão");
    }

    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "uploads",
      file.filename,
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.like.deleteMany({
      where: {
        fileId,
      },
    });

    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });

    return {
      message: "Arquivo deletado",
    };
  }
}

export { DeleteFileService };
