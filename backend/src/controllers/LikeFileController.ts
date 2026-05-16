import { Request, Response } from "express";

import { LikeFileService } from "../services/LikeFileService";

class LikeFileController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const userId = request.user_id;

    console.log(userId);
    console.log(id);

    const likeFileService = new LikeFileService();

    const like = await likeFileService.execute({
      fileId: Number(id),
      userId: Number(userId),
    });

    return response.json(like);
  }
}

export { LikeFileController };
