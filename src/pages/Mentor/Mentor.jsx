import React, { useState } from "react";
import { FaItalic } from "react-icons/fa";
import { FaBold } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Mentor() {
  const [name, setName] = useState("John Doe");
  return (
    <>
      <main className="flex-grow mt-10 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold font-sans text-primary">
                Edit Profile
              </h1>
            </div>
            <a className="btn-link mt-2 md:mt-0 text-primary" href="#">
              View Public Profile
            </a>
          </div>

          <form className="space-y-10">
            <div className="bg-background p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-primary mb-4">
                Profile Photo
              </h2>
              <div className="flex items-center gap-8">
                <div className="relative">
                  <img
                    alt="Mentor Profile Photo"
                    className="w-40 h-40 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB70_AthWHBbSSXdChZhDODh_Qg1JAqWX6VfQkvtoeXos8wvBs6EXpROUxIc09EHfeuc-iTDc-3z0rCjWwm1kzjQ1WC5w_-09JVDFRlUNoGfZaifI1Xwz-I7EeelNYFvhZ7Ahn9hPsHt6mm4fd6xBDZ-ATMuEB8OLBwID-hQ7lMq6O4dx2M7T1m18IEL-bGH9OC3_TILg4gE72DRmZDFGeNgnWJTJNwbwL91lmo2hh5xb3mN11EPnmEtoag5fKFv2r_Ft3Fu1wC-Vs"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-primary text-center text-sm p-4">
                      Change Photo
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FaCloudUploadAlt className="material-icons text-primary text-5xl mx-auto" />
                    <p className="mt-2 text-sm text-primary">
                      Drag &amp; drop your photo here, or
                      <button
                        className="font-semibold text-secondary"
                        type="button"
                      >
                        browse files
                      </button>
                      .
                    </p>
                    <p className="text-xs text-primary mt-1">
                      JPG, PNG, WebP. Max 5MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-primary mb-6">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-secondary mb-1"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-secondary mb-1"
                    for="title"
                  >
                    Title
                  </label>
                  <input
                    className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                    id="title"
                    placeholder="e.g. Senior Software Engineer"
                    type="text"
                  />
                  <p className="text-xs text-secondary mt-1">
                    60 characters max.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <label
                  className="block text-sm font-medium text-secondary mb-1"
                  for="bio"
                >
                  Bio
                </label>
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-2 bg-background border-b border-gray-200 flex items-center space-x-2 text-secondary">
                    <i className="material-icons text-base">
                      <FaBold />
                    </i>

                    <i className="material-icons text-base">
                      <FaItalic />
                    </i>
                    <i className="material-icons text-base">
                      <MdOutlineFormatListBulleted />
                    </i>
                  </div>
                  <textarea
                    className="w-full p-4 border-0 focus:ring-0 resize-y text-secondary"
                    id="bio"
                    placeholder="Tell students a little about yourself..."
                    rows="6"
                  ></textarea>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  500 characters max.
                </p>
              </div>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-bold font-sans text-primary mb-6">
                Skills &amp; Expertise
              </h2>
              <div>
                <label
                  className="block text-sm font-medium text-secondary mb-1"
                  for="skills"
                >
                  Add Skills
                </label>
                <div className="relative">
                  <input
                    className="form-input w-full pr-10 text-secondary"
                    id="skills"
                    placeholder="Search for skills like 'Product Management'"
                    type="text"
                  />
                  <i className="material-icons absolute top-1/2 right-3 -translate-y-1/2 text-secondary">
                    search
                  </i>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Add up to 15 skills. Drag to reorder.
                </p>
              </div>
              <div className="mt-4 space-y-3">
                <h3 className="text-md font-semibold font-sans text-primary">
                  Technical
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-teal-50 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                    <i className="material-icons text-base mr-1 cursor-move">
                      drag_indicator
                    </i>
                    <span>JavaScript</span>
                    <i className="material-icons text-base ml-2 cursor-pointer">
                      close
                    </i>
                  </div>
                  <div className="flex items-center bg-teal-50 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                    <i className="material-icons text-base mr-1 cursor-move">
                      drag_indicator
                    </i>
                    <span>React</span>
                    <i className="material-icons text-base ml-2 cursor-pointer">
                      close
                    </i>
                  </div>
                </div>
                <h3 className="text-md font-semibold font-sans text-primary mt-4">
                  Business
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-amber-50 secondary text-sm font-medium px-3 py-1.5 rounded-full">
                    <i className="material-icons text-base mr-1 cursor-move">
                      drag_indicator
                    </i>
                    <span>Agile Methodologies</span>
                    <i className="material-icons text-base ml-2 cursor-pointer">
                      close
                    </i>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-bold font-sans mb-6">
                Experience &amp; Portfolio
              </h2>
              <div>
                <h3 className="text-lg font-semibold font-sans text-gray-800 mb-4">
                  Work Experience
                </h3>
                <div className="border p-4 rounded-md mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      className="form-input"
                      placeholder="Company"
                      type="text"
                    />
                    <input
                      className="form-input"
                      placeholder="Position"
                      type="text"
                    />
                    <input
                      className="form-input"
                      placeholder="Start Year"
                      type="text"
                    />
                    <input
                      className="form-input"
                      placeholder="End Year (or 'Present')"
                      type="text"
                    />
                  </div>
                  <textarea
                    className="w-full form-input mt-4"
                    placeholder="Description"
                    rows="3"
                  ></textarea>
                </div>
                <button
                  className="btn-secondary h-10 px-4 text-sm"
                  type="button"
                >
                  + Add Work Experience
                </button>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold font-sans text-gray-800 mb-4">
                  Education
                </h3>
                <div className="border p-4 rounded-md mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      className="form-input"
                      placeholder="Institution"
                      type="text"
                    />
                    <input
                      className="form-input"
                      placeholder="Degree"
                      type="text"
                    />
                    <input
                      className="form-input"
                      placeholder="Year of Graduation"
                      type="text"
                    />
                  </div>
                </div>
                <button
                  className="btn-secondary h-10 px-4 text-sm"
                  type="button"
                >
                  + Add Education
                </button>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold font-sans text-gray-800 mb-4">
                  Portfolio Links
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="material-icons text-gray-500 mr-3">link</i>
                    <input
                      className="form-input w-full"
                      placeholder="https://github.com/your-profile"
                      type="url"
                    />
                  </div>
                  <div className="flex items-center">
                    <i className="material-icons text-gray-500 mr-3">link</i>
                    <input
                      className="form-input w-full"
                      placeholder="https://linkedin.com/in/your-profile"
                      type="url"
                    />
                  </div>
                  <div className="flex items-center">
                    <i className="material-icons text-gray-500 mr-3">public</i>
                    <input
                      className="form-input w-full"
                      placeholder="https://your-website.com"
                      type="url"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-bold font-sans mb-6">
                Social &amp; Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <i className="fab fa-twitter text-2xl text-gray-400 mr-3"></i>
                  <input
                    className="form-input w-full"
                    placeholder="twitter.com/username"
                    type="text"
                  />
                </div>
                <div className="flex items-center">
                  <i className="fab fa-instagram text-2xl text-gray-400 mr-3"></i>
                  <input
                    className="form-input w-full"
                    placeholder="instagram.com/username"
                    type="text"
                  />
                </div>
                <div className="flex items-center">
                  <i className="fab fa-facebook text-2xl text-gray-400 mr-3"></i>
                  <input
                    className="form-input w-full"
                    placeholder="facebook.com/username"
                    type="text"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Preferences
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      checked=""
                      className="form-checkbox text-primary rounded"
                      type="checkbox"
                    />
                    <span className="ml-2">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      className="form-checkbox text-primary rounded"
                      type="checkbox"
                    />
                    <span className="ml-2">In-app messages</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-4 pt-4 border-t">
              <span className="text-sm text-gray-500">Auto-saved</span>
              <button
                className="font-poppins text-base font-medium link-primary link-primary:hover cursor-pointer "
                type="button"
              >
                Cancel
              </button>
              <button
                className="flex h-12 min-w-[110px] items-center btn-primary justify-center rounded-lg px-6 text-base  shadow-md btn-primary:hover"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
