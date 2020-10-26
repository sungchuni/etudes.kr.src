<script>
  import {createEventDispatcher, onMount} from "svelte";
  const dispatch = createEventDispatcher();
  const numberFormat = new Intl.NumberFormat("ko-KR", {
    minimumIntegerDigits: 2,
  });
  let computeTime = () => {
    const now = performance.now();
    const diff = now - timestamp;
    timestamp = now;
    remain -= diff;
    print = [
      remain / 3600000,
      (remain / 60000) % 60,
      (remain / 1000) % 60,
      (remain % 1000) * 0.1,
    ]
      .map(Math.trunc)
      .map(numberFormat.format)
      .join(":");
    remain > 0 ? requestAnimationFrame(computeTime) : dispatch("done");
  };
  let date = null;
  let handleMount = () => {
    const iso8601 = document.getElementById("ISO8601");
    date = new Date(iso8601.textContent);
    if (date.getHours() < 22) {
      const soon = new Date(date);
      soon.setHours(22);
      soon.setMinutes(0);
      soon.setSeconds(0);
      soon.setMilliseconds(0);
      (remain = soon - date) > 0
        ? requestAnimationFrame(computeTime)
        : dispatch("done");
    }
    iso8601.remove();
  };
  let print = "";
  let remain = 0;
  let timestamp = performance.now();
  onMount(handleMount);
</script>

<style>
  .timer {
    position: fixed;
    top: 50%;
    left: 0;
    width: 100%;
    color: white;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 128px;
    text-align: center;
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    transform: translateY(-50%);
  }
</style>

<div class="timer">{print}</div>
