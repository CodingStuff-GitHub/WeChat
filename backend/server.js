import connectDatabase from "./config/connectDatabase.js";
import dotenv from "dotenv";
import app from "./app.js";
import http from "http";

//Put environment variables in process
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

//Create and Run server
http
  .createServer(app)
  .listen(process.env.PORT, () =>
    console.log(`Server running on port http://localhost:${process.env.PORT}`)
  );
