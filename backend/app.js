import express from "express";

const app = express();

//User Routes
import { router as userRoutes } from "./routes/userRoutes.js";
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "");
});

export default app;
