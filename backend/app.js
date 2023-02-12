import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//User Routes
import { router as userRoutes } from "./routes/userRoutes.js";
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

export default app;
