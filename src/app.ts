import express from "express";
import { query } from "./config/db";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Hello from chatlink-api",
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await query("SELECT NOW()");
    return res.status(200).json({
      success: true,
      message: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection failed", error);
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unknown error occured",
      });
    }
  }
});

export default app;
