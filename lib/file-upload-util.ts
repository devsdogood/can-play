import { NextApiRequest } from "next";
import { saveUploadedFiles } from "./busboy";
import { parseCsv } from "./csv";

export function hasFileUpload(req: NextApiRequest): boolean {
  return (
    req.method === "POST" &&
    !!req.headers["content-type"]?.includes("multipart/form-data")
  );
}

export async function toJsonRecords(
  req: NextApiRequest
): Promise<Record<string, any>[]> {
  const files = await saveUploadedFiles(req);

  return Promise.all(files.map(parseCsv));
}
