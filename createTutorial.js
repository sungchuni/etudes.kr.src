import TutorialAudio from "./tutorials/TutorialAudio.svelte";
import TutorialKeyboard from "./tutorials/TutorialKeyboard.svelte";
import TutorialMouse from "./tutorials/TutorialMouse.svelte";

const target = document.querySelector(".main");

export default function createTutorial() {
  pipe(TutorialAudio, TutorialMouse, TutorialKeyboard);
}

async function pipe(...Tutorials) {
  for (const Tutorial of Tutorials) {
    await new Promise((resolve) => {
      const tutorial = new Tutorial({target});
      tutorial.$on("done", () => {
        tutorial.$destroy();
        resolve();
      });
    });
  }
}
