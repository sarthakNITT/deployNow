// to start redis
// https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-mac-os/
import express from "express";
import cors from "cors";
import router from "./routes";
import { createClient } from "redis";
import "dotenv/config";

export const publisher = createClient();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", router)

publisher.connect().then(()=>{
    console.log("Connected publisher: redisClient");
    app.listen(3000, ()=>{
        console.log("Server is running on port: 3000");
    })
});