import { Request, Response } from "express";
import { prisma } from "../configs/prisma";

class FavoriteFileController {
  async handle(request: Request, response: Response) {
    const userId = Number(request.user_id);
    const fileId = Number(request.params.id);

    const favoriteExists = await prisma.favorite.findFirst({
      where: {
        userId,
        fileId,
      },
    });

    if (favoriteExists) {
      await prisma.favorite.delete({
        where: {
          id: favoriteExists.id,
        },
      });

      return response.json({
        favorited: false,
      });
    }

    await prisma.favorite.create({
      data: {
        userId,
        fileId,
      },
    });

    return response.json({
      favorited: true,
    });
  }
}

export { FavoriteFileController };
