<script>
  import headset from "./headset-24px.svg";
  import Tutorial from "./Tutorial.svelte";
  import volume from "./volume_up-24px.svg";
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
  const eventTypes = ["click", "keyup"];
  const message = navigator.language.startsWith("ko")
    ? "스피커를 켜거나 이어폰, 헤드폰을 착용하십시오."
    : "Turn on your speakers, or wear earphones or headphones.";
  function destroy() {
    eventTypes.forEach((type) => {
      window.removeEventListener(type, destroy);
    });
    dispatch("done");
  }
  eventTypes.forEach((type) => {
    window.addEventListener(type, destroy);
  });
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
  .action {
    display: flex;
    justify-content: center;
  }
  .button {
    cursor: pointer;
    padding: 2px 32px;
    background-color: transparent;
    border: 2px outset darkgray;
  }
  .button:active {
    border-style: inset;
  }
  .button:focus {
    outline: none;
  }
</style>

<Tutorial>
  <div class="message">
    <img src={volume} alt="volume up" class="image" />
    <img src={headset} alt="use headset" class="image" />
    <p class="text">{message}</p>
  </div>
  <div class="action"><button class="button">확인</button></div>
</Tutorial>
