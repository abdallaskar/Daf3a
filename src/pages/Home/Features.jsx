import { ChartNoAxesCombined, ShieldCheck, UsersRound } from "lucide-react";
import FeaturesCard from "./FeaturesCard";

function Features() {
  return (
    <div>
      <section className="py-24 bg-background sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            <FeaturesCard
              icon={<UsersRound />}
              title="Expert Mentorship"
              description="One-on-one guidance from industry professionals"
            />
            <FeaturesCard
              icon={<ChartNoAxesCombined />}
              title="Skill Development"
              description="Interactive workshops and career-building tools"
            />
            <FeaturesCard
              icon={<ShieldCheck />}
              title="Verified Network"
              description="Trusted community of mentors and ambitious students"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
