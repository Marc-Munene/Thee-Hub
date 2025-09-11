import express from "express";
import "dotenv/config";

const app = express();

// PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
