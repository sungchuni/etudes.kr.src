import {GTAG_ID} from "./constants";

export default function log() {
  location.host.endsWith("etudes.kr") &&
    (gtag("js", new Date()) || gtag("config", GTAG_ID));
}

function gtag() {
  window.dataLayer.push(arguments);
}
