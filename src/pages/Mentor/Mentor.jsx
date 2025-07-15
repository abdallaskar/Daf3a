import React, { useState } from "react";
import { FaItalic, FaBold, FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineFormatListBulleted ,MdDragIndicator,MdClose ,MdOutlineAlternateEmail} from 'react-icons/md' ;

export default function Mentor() {
  const [name, setName] = useState("John Doe");
  return (
    <main className="flex-grow mt-10 mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold font-poppins text-primary">Edit Profile</h1>
          <a className="link-primary mt-2 md:mt-0 font-poppins text-base font-medium" href="#">
            View Public Profile
          </a>
        </div>
        <form className="space-y-10">
          <section className="bg-surface card shadow-xl p-8 rounded-2xl">
            <h2 className="text-xl font-bold font-poppins text-primary mb-4">Profile Photo</h2>
            <div className="flex items-center gap-8 flex-col sm:flex-row">
              <div className="relative">
                <img
                  alt="Mentor Profile Photo"
                  className="w-40 h-40 rounded-full object-cover border-4 border-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB70_AthWHBbSSXdChZhDODh_Qg1JAqWX6VfQkvtoeXos8wvBs6EXpROUxIc09EHfeuc-iTDc-3z0rCjWwm1kzjQ1WC5w_-09JVDFRlUNoGfZaifI1Xwz-I7EeelNYFvhZ7Ahn9hPsHt6mm4fd6xBDZ-ATMuEB8OLBwID-hQ7lMq6O4dx2M7T1m18IEL-bGH9OC3_TILg4gE72DRmZDFGeNgnWJTJNwbwL91lmo2hh5xb3mN11EPnmEtoag5fKFv2r_Ft3Fu1wC-Vs"
                />
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-primary text-center text-sm p-4">Change Photo</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="border-2 border-dashed border-default rounded-lg p-6 text-center bg-background">
                  <FaCloudUploadAlt className="text-primary text-5xl mx-auto" />
                  <p className="mt-2 text-sm text-primary">
                    Drag & drop your photo here, or
                    <button className="font-semibold link-primary ml-1" type="button">browse files</button>.
                  </p>
                  <p className="text-xs text-secondary mt-1">JPG, PNG, WebP. Max 5MB.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-surface card shadow-xl p-8 rounded-2xl">
            <h2 className="text-xl font-bold font-poppins text-primary mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 font-poppins" htmlFor="name">Name</label>
                <input
                  className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1 font-poppins" htmlFor="title">Title</label>
                <input
                  className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                  id="title"
                  placeholder="e.g. Senior Software Engineer"
                  type="text"
                />
                <p className="text-xs text-secondary mt-1">60 characters max.</p>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-secondary mb-1 font-poppins" htmlFor="bio">Bio</label>
              <div className="border border-default rounded-lg bg-background">
                <div className="p-2 bg-background border-b border-default flex items-center space-x-2 text-secondary">
                  <i className="text-base"><FaBold /></i>
                  <i className="text-base"><FaItalic /></i>
                  <i className="text-base"><MdOutlineFormatListBulleted /></i>
                </div>
                <textarea
                  className="input-field w-full p-4 border-0 focus:ring-0 resize-y text-secondary bg-background"
                  id="bio"
                  placeholder="Tell students a little about yourself..."
                  rows="6"
                ></textarea>
              </div>
              <p className="text-xs text-secondary mt-1">500 characters max.</p>
            </div>
          </section>
          <section className="bg-surface card shadow-xl p-8 rounded-2xl">
            <h2 className="text-xl font-bold font-poppins text-primary mb-6">Skills & Expertise</h2>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1 font-poppins" htmlFor="skills">Add Skills</label>
              <div className="relative">
                <input
                  className="input-field w-full pr-10 py-1 text-secondary bg-input border-input border px-2"
                  id="skills"
                  placeholder="Search for skills like 'Product Management'"
                  type="text"
                />
                <span className="material-icons absolute top-1/2 right-3 -translate-y-1/2 text-secondary">search</span>
              </div>
              <p className="text-xs text-secondary mt-1">Add up to 15 skills. Drag to reorder.</p>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="text-md font-semibold font-poppins text-primary">Technical</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center bg-primary-light text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                <MdDragIndicator className="material-icons text-base mr-1 cursor-move"/>
                <span>JavaScript</span>
                  <MdClose className="material-icons text-base ml-2 cursor-pointer"/>
                </div>
                <div className="flex items-center bg-primary-light text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                <MdDragIndicator className="material-icons text-base mr-1 cursor-move"/>
                <span>React</span>
                  <MdClose className="material-icons text-base ml-2 cursor-pointer"/>
                </div>
              </div>
              <h3 className="text-md font-semibold font-poppins text-primary mt-4">Business</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center bg-secondary-bg text-secondary text-sm font-medium px-3 py-1.5 rounded-full">
                  <MdDragIndicator className="material-icons text-base mr-1 cursor-move"/>
                  <span>Agile Methodologies</span>
                  <MdClose className="material-icons text-base ml-2 cursor-pointer"/>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-surface card shadow-xl p-8 rounded-2xl">
            <h2 className="text-xl font-bold font-poppins text-primary mb-6">Experience & Portfolio</h2>
            <div>
              <h3 className="text-lg font-semibold font-poppins text-primary mb-4">Work Experience</h3>
              <div className="border border-default p-4 rounded-md mb-4 bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="input-field px-2 py-1" placeholder="Company" type="text" />
                  <input className="input-field px-2 py-1" placeholder="Position" type="text" />
                  <input className="input-field px-2 py-1" placeholder="Start Year" type="text" />
                  <input className="input-field px-2 py-1" placeholder="End Year (or 'Present')" type="text" />
                </div>
                <textarea className="input-field w-full mt-4 px-2" placeholder="Description" rows="3"></textarea>
              </div>
              <button className="btn-secondary h-10 px-4 text-sm" type="button">+ Add Work Experience</button>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold font-poppins text-primary mb-4">Education</h3>
              <div className="border border-default p-4 rounded-md mb-4 bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="input-field px-2 py-1" placeholder="Institution" type="text" />
                  <input className="input-field px-2 py-1" placeholder="Degree" type="text" />
                  <input className="input-field px-2 py-1" placeholder="Year of Graduation" type="text" />
                </div>
              </div>
              <button className="btn-secondary h-10 px-4 text-sm" type="button">+ Add Education</button>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold font-poppins text-primary mb-4">Portfolio Links</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-[40px_1fr] gap-2 items-center">
                  <span className="material-icons text-secondary flex justify-center items-center h-12">link</span>
                  <input className="input-field bg-input border-input border text-primary text-sm rounded-md px-2 py-1 w-full" placeholder="https://github.com/your-profile" type="url" />
                </div>
                <div className="grid grid-cols-[40px_1fr] gap-2 items-center">
                  <span className="material-icons text-secondary flex justify-center items-center h-12">link</span>
                  <input className="input-field bg-input border-input border text-primary text-sm rounded-md px-2 py-1 w-full" placeholder="https://linkedin.com/in/your-profile" type="url" />
                </div>
                <div className="grid grid-cols-[40px_1fr] gap-2 items-center">
                  <span className="material-icons text-secondary flex justify-center items-center h-12">public</span>
                  <input className="input-field bg-input border-input border text-primary text-sm rounded-md px-2 py-1 w-full" placeholder="https://your-website.com" type="url" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface card shadow-xl p-8 rounded-2xl">
            <h2 className="text-xl font-bold font-poppins text-primary mb-6">Social & Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <MdOutlineAlternateEmail className="material-icons text-secondary mr-3"/>
                <input className="input-field w-full px-2 py-1" placeholder="twitter.com/username" type="text" />
              </div>
              <div className="flex items-center">
                <MdOutlineAlternateEmail className="material-icons text-secondary mr-3"/>
                <input className="input-field w-full px-2 py-1" placeholder="instagram.com/username" type="text" />
              </div>
              <div className="flex items-center">
                <MdOutlineAlternateEmail className="material-icons text-secondary mr-3"/>
                <input className="input-field w-full px-2 py-1" placeholder="facebook.com/username" type="text" />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-secondary mb-2 font-poppins">Contact Preferences</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input className="form-checkbox text-primary rounded" type="checkbox" readOnly />
                  <span className="ml-2 text-primary">Email</span>
                </label>
                <label className="flex items-center ">
                  <input className="form-checkbox text-primary rounded" type="checkbox" readOnly />
                  <span className="ml-2 text-primary">In-app messages</span>
                </label>
              </div>
            </div>
          </section>
          <div className="flex justify-end items-center gap-4 pt-4 border-t border-default">
            <span className="text-sm text-secondary">Auto-saved</span>
            <button className="font-poppins text-base font-medium link-primary link-primary:hover cursor-pointer" type="button">Cancel</button>
            <button className="flex h-12 min-w-[110px] items-center btn-primary justify-center rounded-lg px-6 text-base shadow-md btn-primary:hover" type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </main>
  );
}
