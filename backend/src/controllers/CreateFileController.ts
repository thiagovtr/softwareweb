import { Request, Response } from "express";

import { CreateFileService } from "../services/CreateFileService";

class CreateFileController {
  async handle(request: Request, response: Response) {
    const { title, description, subjectId } = request.body;

    const userId = Number(request.user_id);

    const fileData = request.file;

    if (!fileData) {
      throw new Error("Arquivo não enviado");
    }

    const createFileService = new CreateFileService();

    const file = await createFileService.execute({
      title,
      description,
      filename: fileData.filename,
      size: fileData.size,
      subjectId: Number(subjectId),
      userId,
    });

    return response.json(file);
  }
}

export { CreateFileController };
