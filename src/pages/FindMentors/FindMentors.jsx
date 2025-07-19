import FindAllMentors from "./FindAllMentors";
import FindMentorsHeader from "./FindMentorsHeader";
import FindMentorsInput from "./FindMentorsInput";
import { AuthContext } from "./../../contexts/AuthContextProvider";
import { useContext } from "react";
import UnAuthUser from "../../components/UnAuth/UnAuthUser";

function FindMentors() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <div className="relative bg-background flex size-full min-h-screen flex-col overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <main className="flex-1 container mx-auto px-6 py-10">
              <div className="flex flex-col gap-8">
                <FindMentorsHeader />
                <FindMentorsInput />
                <FindAllMentors />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <UnAuthUser page="and connect with mentors" />
      )}
    </>
  );
}

export default FindMentors;
