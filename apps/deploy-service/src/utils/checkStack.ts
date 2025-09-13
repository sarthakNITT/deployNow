import fs from "fs"

export default function CheckStack (basePath: string) {
    const packageFilePath = `${basePath}/package.json`;
    console.log(`packageFilePath: ${packageFilePath}`);
    
    const data = fs.readFileSync(packageFilePath, {encoding: "utf-8"});
    if(data.includes("vite")){
        return "vite";
    }else{
        return "coreReact"
    };
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