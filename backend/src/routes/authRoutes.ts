import { Router } from "express";
import { AuthUserController } from "../controllers/AuthUserController";

const authRoutes = Router();
const authUserController = new AuthUserController();

authRoutes.post("/", authUserController.handle);

export { authRoutes };
