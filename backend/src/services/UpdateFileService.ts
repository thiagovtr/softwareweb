import { prisma } from "../configs/prisma";
import { AppError } from "../errors/AppError";

interface UpdateFileRequest {
  fileId: number;
  title: string;
  description: string;
  subjectId: number;
  userId: number;
}

class UpdateFileService {
  async execute({
    fileId,
    title,
    description,
    subjectId,
    userId,
  }: UpdateFileRequest) {

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

    if (
      file.userId !== userId &&
      !user?.isAdmin
    ) {
      throw new AppError("Sem permissão");
    }

    const updatedFile = await prisma.file.update({
      where: {
        id: fileId,
      },

      data: {
        title,
        description,
        subjectId,
      },
    });

    return updatedFile;
  }
}

export { UpdateFileService };