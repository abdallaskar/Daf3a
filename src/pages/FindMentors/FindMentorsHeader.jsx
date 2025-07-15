
function FindMentorsHeader() {
  return (
    <div className="flex flex-col mt-15 gap-4 text-center">
      <h2 className="text-3xl font-bold font-poppins text-primary">
        Find Your Perfect Mentor
      </h2>
      <p className="text-secondary max-w-2xl mx-auto">
        Based on your interests in
        <span className="font-semibold text-brand mx-1">
          Product Management
        </span>
        and
        <span className="font-semibold text-brand mx-1">UX Design</span>, we've
        found these mentors for you.
      </p>
    </div>
  );
}

export default FindMentorsHeader;
