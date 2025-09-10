import fs from "fs"
import path from "path";

export default function GetFilePath (filePath: string) {
    let response: string[] = [];
    const files = fs.readdirSync(filePath);
    files.forEach(file => {
        const fullPath = path.join(filePath, file);
        const stat = fs.statSync(fullPath); 
        if (stat.isDirectory()) {
            response = response.concat(GetFilePath(fullPath));
        } else {
            response.push(fullPath);
        }
    });
    return response;
}