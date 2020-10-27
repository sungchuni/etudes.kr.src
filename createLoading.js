import Timer from "./Timer.svelte";
import Title from "./Title.svelte";
import {CLOUDFRONT_HOST, MOUNTAINS} from "./constants";

const loading = document.createElement("div");

export default async function createLoading() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) =>
    Object.assign(deferred, {resolve, reject})
  );
  createMountain();
  new Title({target: loading});
  const timer = new Timer({target: loading});
  timer.$on("done", deferred.resolve);
  document.body.appendChild(loading);
  const {classList} = loading;
  classList.add("loading");
  await deferred.promise;
  classList.add("progress");
  return loading;
}

async function createMountain() {
  const [mountain] = Array.from(MOUNTAINS).sort(() => Math.random() - 0.5);
  const image = loading.appendChild(new Image());
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
}
