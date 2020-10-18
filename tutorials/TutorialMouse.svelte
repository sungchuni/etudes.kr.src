<script>
  import left from "./chevron_left-24px.svg";
  import mouse from "./mouse-24px.svg";
  import right from "./chevron_right-24px.svg";
  import Tutorial from "./Tutorial.svelte";
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
  const message = navigator.language.startsWith("ko")
    ? "마우스를 움직여 주위를 둘러보십시오."
    : "Move your mouse to look around.";
  let movement = 0;
  function destroy() {
    window.removeEventListener("mousemove", handleMousemove);
    dispatch("done");
  }
  function handleMousemove({movementX, movementY}) {
    (movement += Math.abs(movementX) + Math.abs(movementY)) > 1024 && destroy();
  }
  window.addEventListener("mousemove", handleMousemove);
</script>

<style>
  .message {
    display: flex;
  }
  .image {
    margin-right: 4px;
  }
  .text {
    margin: 0;
  }
</style>

<Tutorial>
  <div class="message">
    <img src={left} alt="arrow left" class="image" />
    <img src={mouse} alt="mouse" class="image" />
    <img src={right} alt="arrow right" class="image" />
    <p class="text">{message}</p>
  </div>
</Tutorial>
