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
      msg: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection failed", error);
  }
});

export default app;
