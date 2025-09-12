import fs from "fs";
import path from "path";
import PushBuildToS3 from "../pushBuildTos3";

export default function CoreReactStack (files: string[], fullPath: string, id: string, basePath: string) {
    const indexHtmlPath = `${basePath}/index.html`;

    if(!fs.existsSync(indexHtmlPath)){
        console.log("Wrong path");
        return;
    }
    const targetIndexPath = indexHtmlPath;

    if (targetIndexPath) {
        const original = fs.readFileSync(targetIndexPath, { encoding: "utf-8" });
        const withoutLeadingSlash = original
            .replace(/(href|src)\s*=\s*"\/([^"]*)"/g, '$1="$2"')
            .replace(/(href|src)\s*=\s*'\/([^']*)'/g, "$1='$2'");

        if (withoutLeadingSlash !== original) {
            fs.writeFileSync(targetIndexPath, withoutLeadingSlash, { encoding: "utf-8" });
        }
    }

    files.forEach(async (file) => {
        const relativePath = path.relative(`${fullPath}/dist/${id}/build`, file);
        await PushBuildToS3(`dist/${id}/${relativePath}`, file);
    });
}