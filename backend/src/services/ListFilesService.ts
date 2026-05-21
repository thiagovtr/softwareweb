import { prisma } from "../configs/prisma";

class ListFilesService {
  async execute(subjectId?: number, search?: string) {
    const files = await prisma.file.findMany({
      where: {
        ...(subjectId && { subjectId }),

        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },

            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },

      include: {
        _count: {
          select: {
            likes: true,
          },
        },

        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        subject: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const filesWithUrl = files.map((file) => {
      return {
        ...file,

        _count: undefined,

        likes: file._count.likes,

        url: `http://localhost:3333/uploads/${file.filename}`,
      };
    });

    return filesWithUrl;
  }
}

export { ListFilesService };
