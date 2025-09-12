import fs from "fs"
import { createClient } from "redis";
import ViteStack from "./stacks/vite";
import CoreReactStack from "./stacks/coreReact";

const publisher = createClient();
publisher.connect();

export default function CheckStack (files: string[], fullPath: string, id: string, basePath: string) {
    const packageFilePath = `${basePath}/package.json`;
    const data = fs.readFileSync(packageFilePath, {encoding: "utf-8"});
    if(data.includes("vite")){
        ViteStack(files, fullPath, id);
    }else{
        CoreReactStack(files, fullPath, id, basePath);
    };
    publisher.hSet("status", id, "deployed");
};


















// files.forEach((e)=>{
//     if(e.endsWith("package.json")){
//         const data = fs.readFileSync(e, {encoding: "utf-8"});
//         if(data.includes("vite")) {
//             files.forEach(async (file)=>{
//                 const relativePath = path.relative(`${fullPath}/dist/${id}/build`, file);
//                 await PushBuildToS3(`dist/${id}/${relativePath}`, file);
//             })
//             publisher.hSet("status", id, "deployed");
//         } else {
//             files.forEach(async (file)=>{
//                 const relativePath = path.relative(`${fullPath}/dist/${id}/build`, file);
//                 if(relativePath === "index.html"){
//                     fs
//                 }
//                 await PushBuildToS3(`dist/${id}/${relativePath}`, file);
//             })
//             publisher.hSet("status", id, "deployed");
//         }
//     }
// })