import { prisma } from "../configs/prisma";

class ListFilesService {

  async execute() {

    const files = await prisma.file.findMany({

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

    return files;
  }

}

export { ListFilesService };