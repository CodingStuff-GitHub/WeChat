import connectDatabase from "./config/connectDatabase.js";
import dotenv from "dotenv";
import http from "./app.js";

//Database connection
dotenv.config({ path: "config/config.env" });
connectDatabase();

//Run server
const port = process.env.PORT || 3000;
http.listen(port, () =>
  console.log(`Server running on port http://localhost:${port}`)
);
