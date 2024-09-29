import express, { Request, Response } from "express";
import { query } from "./config/db";
import { ApiResponse } from "./types/apiResponse";

const app = express();

app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    message: "Hello from chatlink-api",
  };

  res.status(200).json(response);
});

app.get("/test-db", async (_: Request, res: Response) => {
  try {
    const result = await query("SELECT NOW()");

    const response: ApiResponse<{ currentTime: string }> = {
      success: true,
      data: { currentTime: result.rows[0].now },
    };

    return res.status(200).json(response);
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
