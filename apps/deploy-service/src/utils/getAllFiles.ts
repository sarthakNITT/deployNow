import fs from "fs"
import path from "path"

export default function GetAllFiles (filePath: string) {
    let response: string[] = [];
    const files = fs.readdirSync(filePath);
    console.log("File path iteration started");
    files.forEach((file)=>{
        const fullPath = path.join(filePath, file);
        const stat = fs.statSync(fullPath);
        if(stat.isDirectory()){
            response = response.concat(GetAllFiles(fullPath));
        }else{
            response.push(fullPath);
        }
    })
    return response;
}