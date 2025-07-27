
import React from "react";
import { FaItalic, FaBold } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";

export default function BasicInfo({ formData, onChange, disabled }) {
  return (
    <section className="bg-surface card shadow-xl p-6 md:p-10 rounded-2xl max-w-3xl mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-bold font-poppins text-primary mb-8 text-center md:text-left">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            className="block text-sm font-medium text-secondary mb-2 font-poppins"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="input-field bg-input border-input border text-primary text-base rounded-lg px-4 py-3 block w-full focus:ring-2 focus:ring-brand transition"
            id="name"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={onChange}
            disabled={disabled}
            maxLength={60}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="block text-sm font-medium text-secondary mb-2 font-poppins"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="input-field bg-input border-input border text-primary text-base rounded-lg px-4 py-3 block w-full focus:ring-2 focus:ring-brand transition"
            id="title"
            name="title"
            placeholder="e.g. Senior Software Engineer"
            type="text"
            value={formData.title || ""}
            onChange={onChange}
            disabled={disabled}
            maxLength={60}
          />
          <p className="text-xs text-secondary mt-1">60 characters max.</p>
        </div>
        <div className="flex flex-col md:col-span-2">
          <label
            className="block text-sm font-medium text-secondary mb-2 font-poppins"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="input-field bg-input border-input border text-primary text-base rounded-lg px-4 py-3 block w-full focus:ring-2 focus:ring-brand transition"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="e.g. +1234567890"
            value={formData.phoneNumber || ""}
            onChange={onChange}
            disabled={disabled}
            maxLength={20}
          />
        </div>
      </div>
      <div className="mt-8">
        <label
          className="block text-sm font-medium text-secondary mb-2 font-poppins"
          htmlFor="bio"
        >
          Bio
        </label>
        <div className="border border-default rounded-lg bg-background">
          <div className="p-2 bg-background border-b border-default flex items-center space-x-2 text-secondary">
            <i className="text-base"><FaBold /></i>
            <i className="text-base"><FaItalic /></i>
            <i className="text-base"><MdOutlineFormatListBulleted /></i>
          </div>
          <textarea
            className="input-field w-full p-4 border-0 focus:ring-2 focus:ring-brand resize-y text-secondary bg-background rounded-b-lg text-base"
            id="bio"
            name="bio"
            placeholder="Tell students a little about yourself..."
            rows="6"
            value={formData.bio || ""}
            onChange={onChange}
            disabled={disabled}
            maxLength={500}
          ></textarea>
        </div>
        <p className="text-xs text-secondary mt-1">500 characters max.</p>
      </div>
    </section>
  );
}
