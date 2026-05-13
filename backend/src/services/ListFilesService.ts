import { prisma } from "../configs/prisma";

class ListFilesService {

  async execute(subjectId?: number) {

    const files = await prisma.file.findMany({

      where: subjectId
        ? { subjectId }
        : undefined,

      include: {

        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },

        subject: true

      },

      orderBy: {
        createdAt: "desc"
      }

    });

    const filesWithUrl = files.map((file) => {

      return {
        ...file,

        url: `http://localhost:3333/uploads/${file.filename}`
      };

    });

    return filesWithUrl;
  }

}

export { ListFilesService };