// External dependencies
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connection from "./config/db.js";


import appRoutes from "./routes/app.routes.js";
import fileRoutes from "./routes/file.routes.js";
import landf from "./routes/landf.routes.js";
import volunteer from "./routes/volunteer.routes.js";

import userRouter from "./routes/user.routes.js";
import tokenRoutes from "./routes/token.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

















dotenv.config();
connection();

// Initialize express app
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Additional routes

app.use(appRoutes);
app.use(fileRoutes);
app.use(landf);
app.use(volunteer);
app.use(userRouter);
app.use(tokenRoutes);
app.use(notificationRoutes);

// Basic root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "App Backend is running" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app
  .listen(PORT, () => {
    console.log(`App Backend is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  });
