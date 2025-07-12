import { FaUsers } from "react-icons/fa";
import FeaturesCard from "./FeaturesCard";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

function Features() {
  return (
    <div>
      <section className="py-24 bg-background sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            <FeaturesCard
              icon={<FaUsers size={32} />}
              title="Expert Mentorship"
              description="One-on-one guidance from industry professionals"
            />
            <FeaturesCard
              icon={<HiOutlinePresentationChartLine size={32} />}
              title="Skill Development"
              description="Interactive workshops and career-building tools"
            />
            <FeaturesCard
              icon={<IoShieldCheckmarkOutline size={32} />}
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
