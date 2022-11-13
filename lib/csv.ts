import * as csvParse from "csv-parse";
import fs from "fs";
import { difference } from "lodash";
import { columnsToArray, registrationColumns } from "../utils/csv-columns";

const COLUMN_MAP = {
  participants: registrationColumns,
  volunteers: registrationColumns, // TODO: add column definition for volunteers
};

export async function parseCsv(
  filePath: string,
  uploadType: "participants" | "volunteers"
): Promise<Record<string, string>[]> {
  const parser = fs
    .createReadStream(filePath)
    .pipe(csvParse.parse({ columns: true }));

  const records: Record<string, string>[] = [];
  for await (const record of parser) {
    records.push(record);
  }

  // ensure all columns are present in CSV
  if (records.length) {
    const columnDef = COLUMN_MAP[uploadType];
    const expected = columnsToArray(columnDef);
    const actual = Object.keys(records[0]);
    
    const missing = difference(expected, actual).map(missing => `"${missing}"`);
    if (missing.length) {
      throw Error(`Missing the following columns in uploaded file: ${missing.join(", ")}`)
    }
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
