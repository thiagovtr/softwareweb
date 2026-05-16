import { Router } from "express";

import { ListSubjectsController } from "../controllers/ListSubjectsController";

const subjectRoutes = Router();

const listSubjectsController = new ListSubjectsController();

subjectRoutes.get("/", listSubjectsController.handle);

export { subjectRoutes };
