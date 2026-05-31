import { prisma } from "../configs/prisma";

class ListCommentsService {
  async execute(fileId: number) {
    const comments = await prisma.comment.findMany({
      where: {
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

      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  }
}

export { ListCommentsService };
