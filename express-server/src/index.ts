import express from "express";
import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const redis = new Redis(6379);
const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const { num1, num2 } = req.body;
  const problemId = uuidv4();
  try {
    await redis.lpush("problem", JSON.stringify({ problemId, num1, num2 }));
    res.json({ message: "problem add to the queue" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to store in Redis store");
  }
});

app.listen(3000, () => console.log("server is listening to port 3000"));
