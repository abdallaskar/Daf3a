import React from "react";
import { FaItalic, FaBold } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { useProfile } from "../../contexts/ProfileContext";

export default function BasicInfo() {
  const { profile, setProfile } = useProfile();
  if (!profile) return null;

  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl">
      <h2 className="text-xl font-bold font-poppins text-primary mb-6">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1 font-poppins" htmlFor="name">Name</label>
          <input
            className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
            id="name"
            type="text"
            value={profile.name || ""}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1 font-poppins" htmlFor="title">Title</label>
          <input
            className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
            id="title"
            placeholder="e.g. Senior Software Engineer"
            type="text"
            value={profile.title || ""}
            onChange={e => setProfile({ ...profile, title: e.target.value })}
          />
          <p className="text-xs text-secondary mt-1">60 characters max.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1 font-poppins" htmlFor="phone">Phone Number</label>
          <input
            className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
            id="phone"
            type="tel"
            placeholder="e.g. +1234567890"
            value={profile.phoneNumber || ""}
            onChange={e => setProfile({ ...profile, phoneNumber: e.target.value })}
          />
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
            value={profile.bio || ""}
            onChange={e => setProfile({ ...profile, bio: e.target.value })}
          ></textarea>
        </div>
        <p className="text-xs text-secondary mt-1">500 characters max.</p>
      </div>
    </section>
  );
}