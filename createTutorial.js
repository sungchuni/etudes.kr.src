import {STORAGE_KEY_TUTORIAL as KEY} from "./constants";
import TutorialAudio from "./tutorials/TutorialAudio.svelte";
import TutorialKeyboard from "./tutorials/TutorialKeyboard.svelte";
import TutorialMouse from "./tutorials/TutorialMouse.svelte";

const target = document.querySelector(".main");

export default async function createTutorial() {
  const {when, seen} = parse(sessionStorage.getItem(KEY)) || {};
  (!seen || new Date() - when > 1800000) &&
    (await pipe(TutorialAudio, TutorialMouse, TutorialKeyboard)) &&
    sessionStorage.setItem(
      KEY,
      JSON.stringify({seen: true, when: +new Date()})
    );
}

function parse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
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
  return true;
}
