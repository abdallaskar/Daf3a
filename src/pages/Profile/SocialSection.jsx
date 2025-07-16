import React from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";

export default function SocialSection() {
  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl">
      <h2 className="text-xl font-bold font-poppins text-primary mb-6">
        Social & Contact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <MdOutlineAlternateEmail className="material-icons text-secondary mr-3" />
          <input
            className="input-field w-full px-2 py-1"
            placeholder="twitter.com/username"
            type="text"
          />
        </div>
        <div className="flex items-center">
          <MdOutlineAlternateEmail className="material-icons text-secondary mr-3" />
          <input
            className="input-field w-full px-2 py-1"
            placeholder="instagram.com/username"
            type="text"
          />
        </div>
        <div className="flex items-center">
          <MdOutlineAlternateEmail className="material-icons text-secondary mr-3" />
          <input
            className="input-field w-full px-2 py-1"
            placeholder="facebook.com/username"
            type="text"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-secondary mb-2 font-poppins">
          Contact Preferences
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              className="form-checkbox text-primary rounded"
              type="checkbox"
              readOnly
            />
            <span className="ml-2 text-primary">Email</span>
          </label>
          <label className="flex items-center ">
            <input
              className="form-checkbox text-primary rounded"
              type="checkbox"
              readOnly
            />
            <span className="ml-2 text-primary">In-app messages</span>
          </label>
        </div>
      </div>
    </section>
  );
}
