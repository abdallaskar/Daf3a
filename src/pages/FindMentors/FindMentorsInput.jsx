import { IoSearch } from "react-icons/io5";
function FindMentorsInput() {
  return (
    <>
      <div className="relative">
        <input
          className="w-full pl-10 pr-4 py-4 rounded-full border-2 border-input focus:outline-none focus:border-primary transition-colors"
          placeholder="Search by skill, industry, or mentor name"
          type="text"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <IoSearch  className="text-primary"/>
        </div>
      </div>
    </>
  );
}

export default FindMentorsInput;
