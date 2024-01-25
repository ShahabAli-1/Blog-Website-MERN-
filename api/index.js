import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
dotenv.config();

mongoose
  .connect(
    "mongodb://shahabali1008:7tp4CeS0AUCh6Ovc@ac-piohn1w-shard-00-00.qcjd1dm.mongodb.net:27017,ac-piohn1w-shard-00-01.qcjd1dm.mongodb.net:27017,ac-piohn1w-shard-00-02.qcjd1dm.mongodb.net:27017/?ssl=true&replicaSet=atlas-dbf9ow-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
// app.post("/api/auth/signup", (req, res) => {
//   console.log("Helloo");
// });
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
