import { Request, Response } from "express";
import { CreateCommentService } from "../services/CreateCommentService";

class CreateCommentController {
  async handle(request: Request, response: Response) {
    const { content } = request.body;

    const { id } = request.params;

    const userId = Number(request.user_id);

    const createCommentService = new CreateCommentService();

    const comment = await createCommentService.execute({
      content,
      userId,
      fileId: Number(id),
    });

    return response.json(comment);
  }
}

export { CreateCommentController };
