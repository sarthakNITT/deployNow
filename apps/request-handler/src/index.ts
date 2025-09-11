import express, { type Request, type Response } from "express";
const app = express();

app.use(express.json());
app.get("/*", async(req: Request, res: Response)=>{
    const host = req.hostname;
    const id = host.split(".")[0];
    console.log(id);
    const filePath = req.path;
})

app.listen(3001, ()=>{
    console.log(`Server is running on port: 3001`);
})