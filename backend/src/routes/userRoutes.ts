import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.get("/profile", isAuthenticated, (request, response) => {
  return response.json({
    message: "Usuário autenticado",
    user_id: request.user_id,
  });
});

export { userRoutes };
