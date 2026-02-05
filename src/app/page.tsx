import About from "./components/About";
import Features from "./components/Features";
import InfoBar from "./components/InfoBar";
import FacebookSection from "./components/FacebookSection";
import RecordsSection from "./components/RecordsSection";

export default function LudwinekPage() {
  return (
    <>
      <InfoBar />
      <Features />
      <About />
      <RecordsSection />
      <FacebookSection />
    </>
  );
}
