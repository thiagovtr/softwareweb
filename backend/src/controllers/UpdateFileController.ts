import { Request, Response } from "express";
import { UpdateFileService } from "../services/UpdateFileService";

class UpdateFileController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const {
      title,
      description,
      subjectId,
    } = request.body;

    const userId = Number(
      request.user_id,
    );

    const updateFileService =
      new UpdateFileService();

    const file =
      await updateFileService.execute({
        fileId: Number(id),
        title,
        description,
        subjectId: Number(subjectId),
        userId,
      });

    return response.json(file);
  }
}

export { UpdateFileController };