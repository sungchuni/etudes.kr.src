export default function listenFullscreen(unityInstance) {
  document
    .querySelector(".main")
    .appendChild(
      Object.assign(document.createElement("div"), {className: "fullscreen"})
    )
    .addEventListener("click", () => unityInstance.SetFullscreen(1));
}
