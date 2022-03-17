export const isFileImage = (file: File) => {
  return file && file["type"].split("/")[0] === "image";
};
