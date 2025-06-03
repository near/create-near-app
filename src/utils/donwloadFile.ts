import https from 'https';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

async function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response: any) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Downloading failed: ${response.statusCode}`));
        return;
      }

      streamPipeline(response, fs.createWriteStream(destination))
        .then(resolve)
        .catch(reject);
    }).on('error', reject);
  });
}

export default downloadFile;