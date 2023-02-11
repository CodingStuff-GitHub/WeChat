import express from "express";
import http from "http";

const app = express();

//User Routes
import { router as userRoutes } from "./routes/userRoutes.js";
app.use("/api/v1", userRoutes);

export default http.createServer(app);
