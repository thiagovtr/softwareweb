import { Request, Response } from "express";
import { GetUserProfileService } from "../services/GetUserProfileService";

class GetUserProfileController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const loggedInUserId = request.user_id; 

    const getUserProfileService = new GetUserProfileService();

    try {
      const profileData = await getUserProfileService.execute(
        Number(id),
        Number(loggedInUserId)
      );

      return response.json(profileData);
    } catch (error) {
      return response.status(404).json({ error: "Perfil não encontrado" });
    }
  }
}

export { GetUserProfileController };