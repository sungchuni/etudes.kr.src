<script>
  import {createEventDispatcher, onMount} from "svelte";
  const dispatch = createEventDispatcher();
  const numberFormat = new Intl.NumberFormat("ko-KR", {
    minimumIntegerDigits: 2,
  });
  let date = null;
  let print = "";
  let remain = 0;
  let timestamp = performance.now();
  function computeTime() {
    const now = performance.now();
    const diff = now - timestamp;
    timestamp = now;
    remain -= diff;
    const [h, m, s] = [
      remain / 3600000,
      (remain / 60000) % 60,
      (remain / 1000) % 60,
      (remain % 1000) * 0.1,
    ];
    print = [h, m, s].map(Math.trunc).map(numberFormat.format).join(":");
    remain > 0 ? requestAnimationFrame(computeTime) : dispatch("done");
  }
  function handleMount() {
    const start = 13;
    const end = 15;
    const iso8601 = document.getElementById("ISO8601");
    date = new Date(iso8601.textContent);
    const uTCHours = date.getUTCHours();
    if (uTCHours < start || uTCHours >= end) {
      const soon = new Date(date);
      uTCHours >= end && soon.setUTCDate(soon.getUTCDate() + 1);
      soon.setUTCHours(start);
      soon.setUTCMinutes(0);
      soon.setUTCSeconds(0);
      soon.setUTCMilliseconds(0);
      (remain = soon - date) > 0 && requestAnimationFrame(computeTime);
    } else {
      requestAnimationFrame(() => dispatch("done"));
    }
    iso8601.remove();
  }
  onMount(handleMount);
</script>

<style>
  .timer {
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 256px;
    font-style: oblique;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.1);
    transform: translateY(-50%);
  }
  .hidden {
    display: none;
  }
  .character {
    flex-basis: 0.6em;
    min-width: 0;
    text-align: center;
  }
  .semi {
    flex-basis: 0.4em;
  }
</style>

<div class="timer" class:hidden={!(remain > 0)}>
  {#each print as character}
    <span class="character" class:semi={character === ':'}>{character}</span>
  {/each}
</div>
