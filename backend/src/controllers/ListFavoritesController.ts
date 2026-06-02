import { Request, Response } from "express";
import { prisma } from "../configs/prisma";

class ListFavoritesController {
  async handle(request: Request, response: Response) {
    const userId = Number(request.user_id);

    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },

      include: {
        file: {
          include: {
            subject: true,

            likes: true,

            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const formattedFavorites = favorites.map((favorite) => ({
      ...favorite.file,

      likes: favorite.file.likes.length,

      isFavorite: true,

      url: `http://localhost:3333/uploads/${favorite.file.filename}`,
    }));

    return response.json(formattedFavorites);
  }
}

export { ListFavoritesController };
