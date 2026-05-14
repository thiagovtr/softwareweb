import express from "express";
import path from "path";

import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";
import { fileRoutes } from "./routes/fileRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/files", fileRoutes);

app.use(errorHandler);

app.use(
  "/uploads",
  express.static(
    path.resolve(__dirname, "..", "uploads")
  )
);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});