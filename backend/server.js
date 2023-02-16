import connectDatabase from "./config/connectDatabase.js";
import dotenv from "dotenv";
import server from "./app.js";

// Put environment variables in process
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

// Create and Run server
server.listen(process.env.PORT, () =>
  console.log(`Server running on port http://localhost:${process.env.PORT}`)
);
