<script>
  import {onMount} from "svelte";
  export let handleMount = () => {};
  onMount(handleMount);
</script>

<style>
  .tutorial {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .content {
    padding: 24px;
    font-size: 16px;
    line-height: 32px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
  }
</style>

<div class="tutorial">
  <div class="content">
    <slot />
  </div>
</div>
