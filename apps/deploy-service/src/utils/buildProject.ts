import { exec } from 'child_process';
import path from 'path';

export default function BuildProject(id: string) {
  return new Promise((resolve) => {
    const child = exec(`
            cd ${path.join(__dirname.slice(0, __dirname.length - 9))}dist/${id} && 
            bun install && 
            bun run build`);

    child.stdout?.on('data', function (data) {
      console.log(`stdout: ${data}`);
    });
    child.stderr?.on('data', function (data) {
      console.log(`stdout: ${data}`);
    });
    child.on('close', function () {
      resolve('');
    });
  });
}
