import connectDatabase from "./config/connectDatabase.js";
import dotenv from "dotenv";
import server from "./app.js";

const isProduction = process.env.NODE_ENV === "production";

// Put environment variables in process
if (!isProduction) {
  dotenv.config({ path: "backend/config/config.env" });
}

connectDatabase();

// Create and Run server
server.listen(process.env.PORT, () =>
  console.log(`Server running on port http://localhost:${process.env.PORT}`)
);
