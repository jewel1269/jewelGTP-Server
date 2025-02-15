import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ChatRouter from "./src/routes/gtp-routes.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use("/api/v1", ChatRouter);

app.get("/", (req, res) => {
  res.send("Jewel GTP Running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
