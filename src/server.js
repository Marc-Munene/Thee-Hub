import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./database/config.js";
import { home } from "./controllers/home.js";
import { clientRouter } from "./routes/clientRoute.js";
import { projectRouter } from "./routes/projectsRoute.js";
import { paymentRouter } from "./routes/paymentRoute.js";

const app = express();

// DB connect
connectDB();

// PORT
const PORT = process.env.PORT;

// cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

//middleware
app.use(express.json());

// Home route
app.get("/", home);

// routing
app.use("/api", clientRouter, projectRouter, paymentRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
