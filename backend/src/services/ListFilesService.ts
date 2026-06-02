import { prisma } from "../configs/prisma";

class ListFilesService {
  async execute(subjectId?: number, search?: string, userId?: number) {
    // 1. recebe userId
    const files = await prisma.file.findMany({
      where: {
        ...(subjectId && { subjectId }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        _count: {
          select: { likes: true },
        },
        likes: userId ? { where: { userId }, select: { userId: true } } : false,

        favorites: userId
          ? {
              where: { userId },
              select: { userId: true },
            }
          : false,
        user: {
          select: { id: true, name: true, email: true },
        },
        subject: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const filesWithUrl = files.map((file) => {
      const isLiked = userId && file.likes ? file.likes.length > 0 : false;

      const isFavorite =
        userId && file.favorites ? file.favorites.length > 0 : false;

      return {
        ...file,
        _count: undefined,
        likes: file._count.likes,
        hasLiked: isLiked,
        isFavorite,
        url: `http://localhost:3333/uploads/${file.filename}`,
      };
    });

    return filesWithUrl;
  }
}

export { ListFilesService };
