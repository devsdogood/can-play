export interface MultipartForm {
  files: string[];
  fields: Record<string, string>;
}
