import { Link } from "react-router";

function AuthHeader() {
  return (
    <>
      <div className="hidden   items-center justify-center lg:flex">
        <div className="text-center">
          <Link
            to={"/"}
            className="mb-8 inline-flex items-center gap-3 text-5xl font-bold text-primary-color"
            href="#"
          >
            <svg
              className="h-12 w-12 text-brand"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="text-primary">Df3a</span>
          </Link>
          <h1 className="mb-4 text-4xl font-bold text-primary">
            Unlock Your Potential
          </h1>
          <p className="max-w-md text-lg text-secondary">
            Join a thriving community of learners and experts. Find your mentor,
            accelerate your growth, and achieve your goals.
          </p>
        </div>
      </div>
    </>
  );
}

export default AuthHeader;
