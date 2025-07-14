
import FindMentorsHeader from "./FindMentorsHeader";
import FindMentorsInput from "./FindMentorsInput";

function FindMentors() {
  return (
    <>
      <div className="relative bg-background flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex-1 container mx-auto px-6 py-10">
            <div className="flex flex-col gap-8">
              <FindMentorsHeader />
              <FindMentorsInput />
            
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default FindMentors;
