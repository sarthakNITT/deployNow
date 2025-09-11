import { publisher } from "..";


export default function RedisPublisher (id: string) {
    console.log("LPush initiated");
    publisher.lPush("build-queue", id).then(()=>{
        console.log("LPush Completed");
    });
    console.log("HSet initiated");
    publisher.hSet("status", id, "uploaded").then(()=>{
        console.log("HSet completed");
    })
}