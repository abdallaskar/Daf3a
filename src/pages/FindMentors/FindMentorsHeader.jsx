import { useContext } from "react";
import { AuthContext } from "./../../contexts/AuthContextProvider";
import { FaRobot } from "react-icons/fa6";
import { Link } from "react-router";
function FindMentorsHeader() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col mt-15 gap-4 text-center">
      <h2 className="text-3xl font-bold font-poppins text-primary">
        Find Your Perfect Mentor
      </h2>
      {user.isRegistered ? (
        <p className="text-secondary max-w-2xl mx-auto">
          Based on your career goal to be a/an
          <span className="font-semibold text-brand mx-1">
            {user.careerGoals}
          </span>
          we've found these mentors for you.
        </p>
      ) : (
        <>
          <p className="text-secondary max-w-2xl mx-auto">
            Explore our diverse range of mentors to find the perfect match for
            your learning journey.
            <br />
            <span className="flex items-center flex-col mt-2">
              {" "}
              <span>Or complete your profile to unlock</span>
              <span className="text-brand font-semibold inline-flex items-center gap-1 mx-1">
                <FaRobot /> AI-powered mentor suggestions
              </span>
              <span> tailored to your career goals.</span>
            </span>
          </p>

          <div className="mt-2">
            <Link
              to="/profile"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition duration-200"
            >
              Complete Your Profile
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default FindMentorsHeader;
