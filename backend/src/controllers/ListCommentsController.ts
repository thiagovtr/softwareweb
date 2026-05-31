import { Request, Response } from "express";
import { ListCommentsService } from "../services/ListCommentsService";

class ListCommentsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listCommentsService = new ListCommentsService();

    const comments = await listCommentsService.execute(Number(id));

    return response.json(comments);
  }
}

export { ListCommentsController };
