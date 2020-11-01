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
  const title = new Title({target: loading});
  const timer = new Timer({target: loading});
  timer.$on("done", deferred.resolve);
  document.body.appendChild(loading);
  const {classList} = loading;
  classList.add("loading");
  await deferred.promise;
  title.$destroy();
  classList.add("progress");
  return loading;
}

async function createMountain() {
  const [mountain] = Array.from(MOUNTAINS).sort(() => Math.random() - 0.5);
  const picture = loading.appendChild(
    Object.assign(document.createElement("picture"), {draggable: false})
  );
  picture.appendChild(
    Object.assign(document.createElement("source"), {
      srcset: `${CLOUDFRONT_HOST}/Static/${mountain}.webp`,
      type: "image/webp",
    })
  );
  const image = picture.appendChild(
    Object.assign(new Image(), {
      src: `${CLOUDFRONT_HOST}/Static/${mountain}.jpg`,
    })
  );
  image.style.cssText = `
  width: 100%;
  height: 100%;
  object-fit: cover;
  `;
}
