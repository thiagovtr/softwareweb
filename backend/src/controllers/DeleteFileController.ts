import { Request, Response } from "express";

import { DeleteFileService } from "../services/DeleteFileService";

class DeleteFileController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const userId = Number(request.user_id);

    const deleteFileService = new DeleteFileService();

    const result = await deleteFileService.execute({
      fileId: Number(id),
      userId,
    });

    return response.json(result);
  }
}

export { DeleteFileController };
