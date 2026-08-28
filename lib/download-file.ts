import path from "node:path";
import { createReadStream, existsSync, statSync } from "node:fs";

export function resolveDownloadFile(filePathFromDb: string | null) {
  const configured = process.env.DOWNLOAD_STORAGE_PATH;
  const root = path.resolve(/* turbopackIgnore: true */ configured || path.join(process.cwd(), "storage", "downloads"));
  const relative = filePathFromDb || "";
  if (!relative || relative.includes("\0") || path.isAbsolute(relative)) {
    return null;
  }
  const resolved = path.resolve(/* turbopackIgnore: true */ root, relative);
  if (!resolved.startsWith(root)) {
    return null;
  }
  if (!existsSync(/* turbopackIgnore: true */ resolved)) {
    return null;
  }
  const stat = statSync(/* turbopackIgnore: true */ resolved);
  if (!stat.isFile()) {
    return null;
  }
  return {
    path: resolved,
    size: stat.size,
    stream: () => createReadStream(/* turbopackIgnore: true */ resolved),
  };
}
