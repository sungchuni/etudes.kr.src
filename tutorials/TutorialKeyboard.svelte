<script>
  import Tutorial from "./Tutorial.svelte";
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
  const keyCodes = new Map([
    ["KeyW", false],
    ["KeyA", false],
    ["KeyS", false],
    ["KeyD", false],
  ]);
  const message = navigator.language.startsWith("ko")
    ? "🅆, 🄰, 🅂, 🄳 키를 눌러 이동하십시오."
    : "Press the 🅆, 🄰, 🅂, 🄳 keys to move.";
  let cancelId = 0;
  function destroy() {
    clearTimeout(cancelId);
    window.removeEventListener("keydown", handleKeydown);
    dispatch("done");
  }
  function handleKeydown({code}) {
    !cancelId &&
      (cancelId = setTimeout(() => {
        destroy();
      }, 5000));
    keyCodes.set(code, true);
    Array.from(keyCodes.values()).every(Boolean) && destroy();
  }
  window.addEventListener("keydown", handleKeydown);
</script>

<style>
  .message {
    display: flex;
  }
  .text {
    margin: 0;
  }
</style>

<Tutorial>
  <div class="message">
    <p class="text">{message}</p>
  </div>
</Tutorial>
