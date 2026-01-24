import About from "./components/About";
import Features from "./components/Features";
import InfoBar from "./components/InfoBar";

import RecordBox from "./components/RecordBox";

export default function LudwinekPage() {
  // const barData: InfoBarData = {
  //   enabled: true,
  //   type: "info",
  //   text: "Najbliższe zawody: 10.02 — zapisy u opiekuna łowiska.",

  // };
  return (
    <>
      <InfoBar />
      <Features />
      <About />
      <RecordBox />
    </>
  );
}
