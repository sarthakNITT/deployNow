import { createClient } from "redis";
import DownloadFromS3 from "./utils/downloadFromS3";
import BuildProject from "./utils/buildProject";
import PushBuildToS3 from "./utils/pushBuildTos3";
import GetAllFiles from "./utils/getAllFiles";
import path from "path"

const subscriber = createClient();
subscriber.connect();
const publisher = createClient();
publisher.connect();

async function Main () {
    while(1){
        const res = await subscriber.brPop(
            "build-queue",
            0
        )
        const id = res?.element;
        console.log(id);
        DownloadFromS3(`output/${id}`).then(()=>{
            console.log("Downloaded");
            BuildProject(`${id}`).then(()=>{
                console.log("build ready");
                const fullPath = __dirname.slice(0, __dirname.length - 3);
                const files = GetAllFiles(`${fullPath}dist/${id}/build`);
                files.forEach(async (file)=>{
                    const relativePath = path.relative(`${fullPath}/dist/${id}/build`, file);
                    await PushBuildToS3(`dist/${id}/${relativePath}`, file);
                })
                const statusId = `${id}`;
                publisher.hSet("status", statusId, "deployed");
            });
        });
    }
}
Main();