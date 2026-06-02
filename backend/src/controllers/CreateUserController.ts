import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    if (!password || password.length < 6) {
      return response.status(400).json({ 
        error: "A senha deve conter no mínimo 6 caracteres." 
      });
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export { CreateUserController };