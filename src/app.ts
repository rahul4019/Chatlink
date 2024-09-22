import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Hello from chatlink-api",
  });
});

export default app;
