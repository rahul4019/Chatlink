import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { pool } from "./config/db";
import { initializeTables } from "./models";

const startServer = async () => {
  await initializeTables();

  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is up and running on PORT: ${process.env.PORT}`);
  });

  process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await pool.end(); // closing the db connection
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("Shutting down gracefully...");
    await pool.end(); // closing the db connection
    process.exit(0);
  });
};

startServer().catch((error) => {
  console.error("Error starting the server: ", error);
  process.exit(1);
});
