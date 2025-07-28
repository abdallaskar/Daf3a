import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import OurMentors from "./OurMentors";
import SuccessStories from "./SuccessStories";

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <OurMentors id="OurTopMentors" />
      <HowItWorks id="HowItWorks" />
      <SuccessStories id="success-stories" />
    </div>
  );
}

export default Home;
