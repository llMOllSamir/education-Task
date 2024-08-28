import ButtonScrollToUp from "../../components/ButtonScrollToUp/ButtonScrollToUp";
import Contact from "../../components/Contact/Contact";
import Hero from "../../components/Hero/Hero";
import TwoSection from "../../components/TwoSection/TwoSection";
import MgalatSection from "../../components/MgalatSection/MgalatSection";
import AlMekyasSection from "../../components/AlMekyasSection/AlMekyasSection";
function Home() {
  return (
    <>
      <ButtonScrollToUp />
      <Hero />
      <TwoSection />
      <MgalatSection />
      <AlMekyasSection />
      <Contact />
    </>
  );
}

export default Home;
