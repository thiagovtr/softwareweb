import { Request, Response } from "express";
import { ListFilesService } from "../services/ListFilesService";

class ListFilesController {
  async handle(request: Request, response: Response) {
    const { subjectId, search } = request.query;

    const userId = request.user_id;

    const listFilesService = new ListFilesService();

    const files = await listFilesService.execute(
      subjectId ? Number(subjectId) : undefined,
      search ? String(search) : undefined,
      userId ? Number(userId) : undefined,
    );

    return response.json(files);
  }
}

export { ListFilesController };
