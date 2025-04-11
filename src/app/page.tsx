import About from "./components/About";
import Contact from "./components/Contact";
import Description from "./components/Description";
import Features from "./components/Features";
import Price from "./components/Price";
import RecordBox from "./components/RecordBox";
import Regulations from "./components/Regulation";
import Reservation from "./components/Reservation";

export default function LudwinekPage() {
  return (
    <>
      <Features />
      <About />

      <Price />
      {/* <Regulations />
      <Contact />
      <Reservation /> */}
      <RecordBox />
    </>
  );
}
