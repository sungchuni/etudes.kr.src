export default function listenFullscreen(unityInstance) {
  document
    .querySelector(".fullscreen")
    .addEventListener("click", () => unityInstance.SetFullscreen(1));
}
