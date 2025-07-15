import React from "react";

import PhotoSection from "./PhotoSection";
import BasicInfo from "./BasicInfo";
import AvailabilitySelection from "./AvailabilitySelection";
import LanguagesSection from "./LanguagesSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import SocialSection from "./SocialSection";

export default function Mentor() {
  return (
    <main className="flex-grow mt-10 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold font-poppins text-primary">
            Edit Profile
          </h1>
          <a
            className="link-primary mt-2 md:mt-0 font-poppins text-base font-medium"
            href="#"
          >
            View Public Profile
          </a>
        </div>
        <form className="space-y-10">
          <PhotoSection />

          <BasicInfo />

          <LanguagesSection />

          <SkillsSection />

          <AvailabilitySelection />

          <ExperienceSection />

          <SocialSection />

          <div className="flex justify-end items-center gap-4 pt-4 border-t border-default">
            <span className="text-sm text-secondary">Auto-saved</span>
            <button
              className="font-poppins text-base font-medium link-primary link-primary:hover cursor-pointer"
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex h-12 min-w-[110px] items-center btn-primary justify-center rounded-lg px-6 text-base shadow-md btn-primary:hover"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
