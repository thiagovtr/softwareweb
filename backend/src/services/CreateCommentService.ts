import { prisma } from "../configs/prisma";
import { AppError } from "../errors/AppError";

interface CreateCommentRequest {
  content: string;
  userId: number;
  fileId: number;
}

class CreateCommentService {
  async execute({
    content,
    userId,
    fileId,
  }: CreateCommentRequest) {

    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      throw new AppError(
        "Arquivo não encontrado",
      );
    }

    const comment =
      await prisma.comment.create({
        data: {
          content,
          userId,
          fileId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    return comment;
  }
}

export { CreateCommentService };