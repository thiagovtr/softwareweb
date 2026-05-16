import { Request, Response } from "express";

import { ListSubjectsService } from "../services/ListSubjectsService";

class ListSubjectsController {
  async handle(req: Request, res: Response) {
    const service = new ListSubjectsService();

    const subjects = await service.execute();

    return res.json(subjects);
  }
}

export { ListSubjectsController };
