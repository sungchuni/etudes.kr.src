<script>
  import {CLOUDFRONT_HOST} from "./constants";
  const items = [
    {
      alt: "Yetsuby / Yeong Die / Sunggun Jang / Minwhee Lee / Hanjoo Kim",
      className: "artists",
    },
    {alt: "quarantine etudes", className: "title"},
    {alt: "2020-11-1 ~ 11-30", className: "date"},
    {
      alt:
        "Director Yeong Choi / 3D Desginer Uljiro Kim / Programmer Sungchun Park / Poster Designer Minyoung Yang / Writer Yeasul Shin, Seungrin Lee, Guwon Jung",
      className: "credits",
    },
  ];
</script>

<style>
  @keyframes credits {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
  .subtitle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .item {
    position: absolute;
    user-select: none;
  }
  .item::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .artists {
    top: 0;
    right: -16px;
    width: 924px;
  }
  .title {
    top: 24px;
    right: -32px;
    width: 1176px;
  }
  .date {
    bottom: 54px;
    right: 12px;
    width: 672px;
  }
  .credits {
    bottom: 0;
    left: 0;
    width: 1680px;
    animation: credits 32s linear infinite;
  }
  .image {
    max-width: 100%;
    object-fit: contain;
  }
</style>

<div class="subtitle">
  {#each items as {alt, className}}
    <div class={['item', className].join(' ')}>
      <picture draggable="false">
        <source
          srcset={`${CLOUDFRONT_HOST}/Static/${className}.webp`}
          type="image/webp" />
        <img
          src={`${CLOUDFRONT_HOST}/Static/${className}.png`}
          {alt}
          class="image" />
      </picture>
    </div>
  {/each}
</div>
