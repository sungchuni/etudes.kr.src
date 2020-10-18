import "./index.css";
import bootstrap from "./bootstrap";
import createLoading from "./createLoading";
import createTutorial from "./createTutorial";
import log from "./log";
import listenFullscreen from "./listenFullscreen";
import removeLoading from "./removeLoading";

window.addEventListener("DOMContentLoaded", main);
window.dataLayer = window.dataLayer || [];
window.devicePixelRatio = 1.5;

async function main() {
  const [loading, unityInstance] = await Promise.all([
    createLoading(),
    bootstrap(),
  ]);
  log();
  listenFullscreen(unityInstance);
  await removeLoading(loading);
  createTutorial();
}
