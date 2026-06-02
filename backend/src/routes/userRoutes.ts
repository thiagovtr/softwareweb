import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { GetUserProfileController } from "../controllers/GetUserProfileController";

const userRoutes = Router();
const createUserController = new CreateUserController();
const getUserProfileController = new GetUserProfileController();

userRoutes.post("/", createUserController.handle);

userRoutes.get("/profile", isAuthenticated, (request, response) => {
  return response.json({
    message: "Usuário autenticado",
    user_id: request.user_id,
  });
});

userRoutes.get("/:id", isAuthenticated, getUserProfileController.handle);

export { userRoutes };