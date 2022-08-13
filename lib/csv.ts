import csvParse from "csv-parse";
import fs from "fs";

export async function parseCsv(filePath: string): Promise<Record<string, any>> {
  const parser = fs
    .createReadStream(filePath)
    .pipe(csvParse.parse({ columns: true }));

  const records: Record<string, any>[] = [];
  for await (const record of parser) {
    records.push(record);
  }

  await deleteTempFile(filePath);
  return records;
}

async function deleteTempFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
