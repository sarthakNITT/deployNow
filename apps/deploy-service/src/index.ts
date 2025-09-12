import { createClient } from "redis";
import DownloadFromS3 from "./utils/downloadFromS3";
import BuildProject from "./utils/buildProject";
import GetAllFiles from "./utils/getAllFiles";
import CheckStack from "./utils/checkStack";

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
        DownloadFromS3(`output/${id}`).then(()=>{
            console.log("Downloaded");
            BuildProject(`${id}`).then(()=>{
                console.log("build ready");
                const fullPath = __dirname.slice(0, __dirname.length - 3);
                const files = GetAllFiles(`${fullPath}dist/${id}/build`);
                console.log("Checking tech-stack of project");
                const statusId = `${id}`;
                CheckStack(files, fullPath, statusId, `${fullPath}dist/${id}/build`);
            });
        });
    }
}
Main();