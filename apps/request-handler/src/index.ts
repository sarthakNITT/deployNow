import { serve } from "bun";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { client } from "@repo/aws-clilent/client";
import "dotenv/config";

let currentId = "";

serve({
    port: 3001,
    idleTimeout: 30,
    async fetch(req) {
        const url = new URL(req.url);
        console.log(url);
        const parts = url.pathname.split("/").filter(Boolean);
        console.log(parts);
        
        if(parts.length >= 1 && !currentId){
            currentId = parts[0]!;
            parts.shift();
            }else if(!currentId){
                return new Response("Bad Request", { status: 400 });
            }else if(currentId && parts[0]===currentId){
                parts.shift();
            }
    
        const remainingPath = parts.length > 0 ? parts.join("/") : "index.html";
        const key = `dist/${currentId}/${remainingPath}`;
        console.log("S3 Key:", key);
    
        try {
            const s3Res = await client.send(new GetObjectCommand({ 
            Bucket: "deploy-now", 
            Key: key 
            }));
            
            const body = await s3Res.Body?.transformToString();
            if (!body) {
            console.log("Empty file returned from S3");
            return new Response("Empty file", { status: 404 });
            }
    
            const type = key.endsWith(".html")
            ? "text/html; charset=utf-8"
            : key.endsWith(".css")
            ? "text/css; charset=utf-8"
            : key.endsWith(".js")
            ? "application/javascript; charset=utf-8"
            : key.endsWith(".svg")
            ? "image/svg+xml"
            : key.endsWith(".png")
            ? "image/png"
            : key.endsWith(".jpg") || key.endsWith(".jpeg")
            ? "image/jpeg"
            : key.endsWith(".gif")
            ? "image/gif"
            : key.endsWith(".webp")
            ? "image/webp"
            : key.endsWith(".ico")
            ? "image/x-icon"
            : "application/octet-stream";
    
            return new Response(body, { headers: { "Content-Type": type } });
        } catch (err) {
            console.error(err);
            return new Response("Not Found", { status: 404 });
        }
    },
  });
  