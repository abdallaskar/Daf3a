import React from "react";

export default function ExperienceSection() {
  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl">
      <h2 className="text-xl font-bold font-poppins text-primary mb-6">
        Experience & Portfolio
      </h2>
      <div>
        <h3 className="text-lg font-semibold font-poppins text-primary mb-4">
          Work Experience
        </h3>
        <div className="border border-default p-4 rounded-md mb-4 bg-background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input-field px-2 py-1"
              placeholder="Company"
              type="text"
            />
            <input
              className="input-field px-2 py-1"
              placeholder="Position"
              type="text"
            />
            <input
              className="input-field px-2 py-1"
              placeholder="Start Year"
              type="text"
            />
            <input
              className="input-field px-2 py-1"
              placeholder="End Year (or 'Present')"
              type="text"
            />
          </div>
          <textarea
            className="input-field w-full mt-4 px-2"
            placeholder="Description"
            rows="3"
          ></textarea>
        </div>
        <button className="btn-secondary h-10 px-4 text-sm" type="button">
          + Add Work Experience
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold font-poppins text-primary mb-4">
          Education
        </h3>
        <div className="border border-default p-4 rounded-md mb-4 bg-background">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input-field px-2 py-1"
              placeholder="Institution"
              type="text"
            />
            <input
              className="input-field px-2 py-1"
              placeholder="Degree"
              type="text"
            />
            <input
              className="input-field px-2 py-1"
              placeholder="Year of Graduation"
              type="text"
            />
          </div>
        </div>
        <button className="btn-secondary h-10 px-4 text-sm" type="button">
          + Add Education
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold font-poppins text-primary mb-4">
          Portfolio Links
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-[40px_1fr] gap-2 items-center">
            <span className="material-icons text-secondary flex justify-center items-center h-12">
              link
            </span>
            <input
              className="input-field bg-input border-input border text-primary text-sm rounded-md px-2 py-1 w-full"
              placeholder="https://github.com/your-profile"
              type="url"
            />
          </div>
          <div className="grid grid-cols-[40px_1fr] gap-2 items-center">
            <span className="material-icons text-secondary flex justify-center items-center h-12">
              link
            </span>
            <input
              className="input-field bg-input border-input border text-primary text-sm rounded-md px-2 py-1 w-full"
              placeholder="https://linkedin.com/in/your-profile"
              type="url"
            />
          </div>
          <div className="grid grid-cols-[40px_1fr] gap-2 items-center">
            <span className="material-icons text-secondary flex justify-center items-center h-12">
              public
            </span>
            <input
              className="input-field bg-input border-input border text-primary text-sm rounded-md px-2 py-1 w-full"
              placeholder="https://your-website.com"
              type="url"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
