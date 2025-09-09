import express, { type Request } from "express";
import cors from "cors";
import router from "./src/routes";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router)

app.listen(3000, ()=>{
    console.log("Server is running on port: 3000");
})