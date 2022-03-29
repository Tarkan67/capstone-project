import dynamic from "next/dynamic";
// dynamic import for rendering window
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default Map;
