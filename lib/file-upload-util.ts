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
  req: NextApiRequest,
  uploadType: "participants" | "volunteers", // TODO: consolidate this type into an enum?
): Promise<Record<string, string>[]> {
  const form = await saveUploadedFiles(req);

  const records = form.files.map((f) => parseCsv(f, uploadType));
  return (await Promise.all(records)).flat();
}
