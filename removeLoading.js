export default async function removeLoading(loading) {
  const {style} = loading;
  style.opacity = 1;
  while (style.opacity > 0) {
    await new Promise(window.requestAnimationFrame);
    style.opacity -= 0.02;
  }
  loading.remove();
}
