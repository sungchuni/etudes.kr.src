import {CLOUDFRONT_HOST} from "./constants";

export default async function bootstrap() {
  const canvas = Object.assign(document.querySelector(".canvas"), {
    width: 960,
    height: 540,
  });
  const unityInstance = await createUnityInstance(canvas, {
    dataUrl: new URL("/Build/WebGL.data.br", CLOUDFRONT_HOST).toString(),
    frameworkUrl: new URL(
      "/Build/WebGL.framework.js.br",
      CLOUDFRONT_HOST
    ).toString(),
    codeUrl: new URL("/Build/WebGL.wasm.br", CLOUDFRONT_HOST).toString(),
    streamingAssetsUrl: new URL("/StreamingAssets", CLOUDFRONT_HOST).toString(),
    companyName: "Yeong Die",
    productName: "etudes.kr",
    productVersion: "1.0.1",
  });
  return unityInstance;
}
