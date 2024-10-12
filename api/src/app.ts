import express, { Request, Response } from "express";
import { query } from "./config/db";
import { ApiResponse } from "./types/apiResponse";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestIp.mw());

app.get("/", (_: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    message: "Hello from chatlink-api",
  };

  return res.status(200).json(response);
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
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unknown error occured",
      });
    }
  }
});

app.use("/api/v1", routes);

app.use(errorHandler);
export default app;
