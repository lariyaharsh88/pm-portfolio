import fs from "node:fs"
import path from "node:path"
import { resumeFile } from "@/lib/resume-path"

export async function hasResume() {
  "use cache"
  return fs.existsSync(path.join(process.cwd(), "public", resumeFile))
}
