import path from "node:path"
import sharp from "sharp"

export async function photoBlur(file: string) {
  "use cache"
  const buffer = await sharp(path.join(process.cwd(), "public", file))
    .resize(16, 16, { fit: "cover" })
    .jpeg({ quality: 40 })
    .toBuffer()
  return `data:image/jpeg;base64,${buffer.toString("base64")}`
}
