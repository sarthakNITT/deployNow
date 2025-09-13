import path from 'path';

import PushBuildToS3 from '../pushBuildTos3';

export default function ViteStack(
  files: string[],
  fullPath: string,
  id: string
) {
  files.forEach(async (file) => {
    const relativePath = path.relative(`${fullPath}/dist/${id}/dist`, file);
    await PushBuildToS3(`dist/${id}/${relativePath}`, file);
  });
}
