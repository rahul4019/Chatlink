import dotenv from "dotenv";
dotenv.config();

import app from "./app";

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is up and running on PORT: ${process.env.PORT}`);
});
