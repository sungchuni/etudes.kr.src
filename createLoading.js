import {CLOUDFRONT_HOST, MOUNTAINS} from "./constants";

export default async function createLoading() {
  const [mountain] = Array.from(MOUNTAINS).sort(() => Math.random() - 0.5);
  const loading = Object.assign(document.createElement("div"), {
    className: "loading",
  });
  const image = new Image();
  image.style.cssText = `
  width: 100%;
  height: 100%;
  object-fit: cover;
  `;
  try {
    image.src = new URL(`/Static/1px.webp`, CLOUDFRONT_HOST);
    await image.decode();
    image.src = new URL(`/Static/${mountain}.webp`, CLOUDFRONT_HOST);
  } catch {
    image.src = new URL(`/Static/${mountain}.jpg`, CLOUDFRONT_HOST);
  }
  loading.appendChild(image);
  return document.body.appendChild(loading);
}
