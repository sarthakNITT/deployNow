import { createClient } from "redis";
import DownloadFromS3 from "./utils/downloadFromS3";
import BuildProject from "./utils/buildProject";
import PushBuildToS3 from "./utils/pushBuildTos3";
import GetAllFiles from "./utils/getAllFiles";
import path from "path"

const subscriber = createClient();
subscriber.connect();

async function Main () {
    while(1){
        const res = await subscriber.brPop(
            "build-queue",
            0
        )
        const id = res?.element;
        console.log(id);
        await DownloadFromS3(`${id}`);
        console.log("Downloaded");
        await BuildProject(`${id}`);
        console.log("build ready");
        const fullPath = __dirname.slice(0, __dirname.length - 3);
        const files = GetAllFiles(`${fullPath}dist/id`);
        files.forEach(async (file)=>{
            const relativePath = path.relative(fullPath, file);
            await PushBuildToS3(`${id}/${relativePath}`, file);
        })
    }
}
Main();