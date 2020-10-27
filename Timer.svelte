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
    const start = 22;
    const iso8601 = document.getElementById("ISO8601");
    date = new Date(iso8601.textContent);
    if (date.getHours() < start) {
      const soon = new Date(date);
      soon.setHours(start);
      soon.setMinutes(0);
      soon.setSeconds(0);
      soon.setMilliseconds(0);
      (remain = soon - date) > 0 && requestAnimationFrame(computeTime);
    } else {
      requestAnimationFrame(() => dispatch("done"));
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
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 180px;
    transform: translateY(-50%);
  }
  .character {
    flex-basis: 0.55em;
    min-width: 0;
    text-align: center;
  }
  .semi {
    flex-basis: 0.3em;
  }
</style>

<div class="timer">
  {#each print as character}
    <span class="character" class:semi={character === ':'}>{character}</span>
  {/each}
</div>
