import express from "express";

import { userRoutes } from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});