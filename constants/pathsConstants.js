import path from "node:path";

export const avatarsDirName = "avatars";
export const uploadsDirPath = path.resolve("temp");
export const avatarsDirPath = path.resolve("public", avatarsDirName);
export const SWAGGER_PATH = path.join(process.cwd(), "docs", "swagger.json");
