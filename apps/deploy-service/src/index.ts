import { createClient } from "redis";
import DownloadFromS3 from "./utils/downloadFromS3";
import BuildProject from "./utils/buildProject";
import GetAllFiles from "./utils/getAllFiles";
import CheckStack from "./utils/checkStack";
import ViteStack from "./utils/stacks/vite";
import CoreReactStack from "./utils/stacks/coreReact";
import "dotenv/config";

const subscriber = createClient();
subscriber.connect();
const publisher = createClient();
publisher.connect();

async function Main () {
    while(1){
        console.log(`Infinite loop started`);
        try {
            const res = await subscriber.brPop(
                "build-queue",
                0
            )
            
            if(!res){
                console.log("no res returned");
                return;
            }

            const id = res.element;
            console.log(`Got response: ${id}`);

            DownloadFromS3(`output/${id}`).then(()=>{
                console.log("Downloaded");

                BuildProject(`${id}`).then(()=>{
                    console.log("build ready");
                    
                    const fullPath = __dirname.slice(0, __dirname.length - 3);
                    const stack = CheckStack(`${fullPath}dist/${id}`);
                    console.log("Checking tech-stack of project");
                    console.log(`stack: ${stack}`);
                    
                    let getFilesFrom: string = "";
                    if(stack === "vite"){
                        getFilesFrom = `${fullPath}dist/${id}/dist`;
                    }else if(stack === "coreReact"){
                        getFilesFrom = `${fullPath}dist/${id}/build`;
                    }
                    
                    console.log(`request files from: ${getFilesFrom}`);
                    if(!getFilesFrom){
                        console.log("Invalid path to get Files");
                        return;
                    }

                    const files = GetAllFiles(getFilesFrom);
                    
                    if(stack === "vite"){
                        console.log("called viteStack");
                        ViteStack(files, fullPath, id);
                    }else if(stack === "coreReact"){
                        console.log("called coreReactStack");
                        CoreReactStack(files, fullPath, id, getFilesFrom);
                    }
                    publisher.hSet("status", id, "deployed");
                });
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }
}
Main();