import { publisher } from "..";


export default function RedisPublisher (id: string) {
    publisher.lPush("build-queue", id);
    publisher.hSet("status", id, "uploaded")
}