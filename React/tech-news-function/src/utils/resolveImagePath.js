import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";

const localAssetMap = {
  "1.jpg": img1,
  "2.jpg": img2,
  "3.jpg": img3,
  "4.jpg": img4,
  "5.jpg": img5,
  "6.jpg": img6,
};

export function resolveImageUrl(image) {
  if (!image || typeof image !== "string") return "";

  const trimmed = image.trim();
  if (!trimmed) return "";

  if (/^(https?:)?\/\//.test(trimmed)) {
    return trimmed;
  }

  const normalized = trimmed.replace(/\\/g, "/");
  const fileName = normalized.split("/").pop();

  if (fileName && localAssetMap[fileName]) {
    return localAssetMap[fileName];
  }

  if (fileName) {
    try {
      return new URL(`../assets/${fileName}`, import.meta.url).href;
    } catch (err) {
      console.error("Could not resolve local image:", err, image);
      return trimmed;
    }
  }

  return trimmed;
}
