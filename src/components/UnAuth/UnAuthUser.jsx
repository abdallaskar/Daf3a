import { CiLock } from "react-icons/ci";
import { Link } from 'react-router';

function UnAuthUser({ page }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-center p-6">
      <CiLock size={48} color=" var(--primary-brand)"/>
      <h2 className="text-2xl mt-3 font-bold text-primary">
        You must be signed in
      </h2>
      <p className="text-secondary my-3 text-sm">
        Please log in or create an account to explore {page}.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/login"
          className="btn-primary px-6 py-3 rounded-md font-medium "
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          className=" px-6 py-3 rounded-md btn-secondary"
        >
          Create Account
        </Link>
      </div>
      <div className="pt-8 space-y-4 text-sm text-secondary">
        <p>Join thousands of professionals already connected on our platform</p>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <span className="flex items-center gap-1">✓ Expert mentors</span>
          <span className="flex items-center gap-1">
            ✓ Personalized matching
          </span>
          <span className="flex items-center gap-1">✓ Secure platform</span>
        </div>
      </div>
    </div>
  );
}

export default UnAuthUser;
