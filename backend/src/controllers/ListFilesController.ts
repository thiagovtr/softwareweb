import { Request, Response } from "express";

import { ListFilesService } from "../services/ListFilesService";

class ListFilesController {

  async handle(request: Request, response: Response) {

    const listFilesService = new ListFilesService();

    const files = await listFilesService.execute();

    return response.json(files);
  }

}

export { ListFilesController };