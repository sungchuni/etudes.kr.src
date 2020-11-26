export default function listenFullscreen(unityInstance) {
  document
    .querySelector(".main")
    .appendChild(
      Object.assign(document.createElement("div"), {className: "fullscreen"})
    )
    .addEventListener("click", () => unityInstance.SetFullscreen(1));
  document.addEventListener(
    "keyup",
    ({code, key}) =>
      (code === "KeyF" || ["f", "F"].includes(key)) &&
      unityInstance.SetFullscreen(document.fullscreenElement ? 0 : 1)
  );
}
