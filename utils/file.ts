import * as fs from "fs/promises";
import { constants } from "fs";

export type FileType = "file" | "directory";

export async function exists(p: string, type?: FileType): Promise<boolean> {
  try {
    const stat = await fs.stat(p);
    if (!type) return true;
    return type === "directory" ? stat.isDirectory() : stat.isFile();
  } catch (err) {
    return false;
  }
}

export async function isReadWrite(p: string): Promise<boolean> {
  try {
    await fs.access(p, constants.R_OK | constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}
