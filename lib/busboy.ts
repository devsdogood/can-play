import busboy from "busboy";
import { randomFillSync } from "crypto";
import fs from "fs";
import { NextApiRequest } from "next";
import os from "os";
import path from "path";

const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString("hex");
})();

export async function saveUploadedFiles(req: NextApiRequest): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });

    const filePaths = Array<string>();

    bb.on("file", (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(
        `File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`
      );
      const saveTo = path.join(os.tmpdir(), `busboy-upload-${random()}`);
      file.pipe(fs.createWriteStream(saveTo));
      filePaths.push(saveTo);
    });
    bb.on("field", (name, val, info) => {
      console.log(`Field [${name}]: value: ${val}\n, info: ${info}`);
    });
    bb.on("close", () => {
      resolve(filePaths);
    });
    bb.on("error", (error) => {
      reject(error);
    });
    req.pipe(bb);
  });
}
