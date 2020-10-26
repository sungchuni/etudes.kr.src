import Timer from "./Timer.svelte";
import {CLOUDFRONT_HOST, MOUNTAINS} from "./constants";

const loading = Object.assign(document.createElement("div"), {
  className: "loading",
});

export default async function createLoading() {
  await createMountain();
  new Timer({target: loading});
  loading.onabort = console.info;
  return document.body.appendChild(loading);
}

async function createMountain() {
  const [mountain] = Array.from(MOUNTAINS).sort(() => Math.random() - 0.5);
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
  return image;
}
