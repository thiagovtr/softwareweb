import { prisma } from "../configs/prisma";

interface CreateFileRequest {
  title: string;
  description?: string;
  filename: string;
  size: number;
  subjectId: number;
  userId: number;
}

class CreateFileService {

  async execute({
    title,
    description,
    filename,
    size,
    subjectId,
    userId
  }: CreateFileRequest) {

    const file = await prisma.file.create({
      data: {
        title,
        description,
        filename,
        size,
        subjectId,
        userId
      }
    });

    return file;
  }

}

export { CreateFileService };