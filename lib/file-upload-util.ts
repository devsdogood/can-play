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
): Promise<Record<string, string>[]> {
  const form = await saveUploadedFiles(req);

  return (await Promise.all(form.files.map(parseCsv))).flat();
}
