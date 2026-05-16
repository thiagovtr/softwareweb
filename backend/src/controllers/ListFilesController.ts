import { Request, Response } from "express";

import { ListFilesService } from "../services/ListFilesService";

class ListFilesController {
  async handle(request: Request, response: Response) {
    const { subjectId } = request.query;

    const listFilesService = new ListFilesService();

    const files = await listFilesService.execute(
      subjectId ? Number(subjectId) : undefined,
    );

    return response.json(files);
  }
}

export { ListFilesController };
