import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function PhotoSection({ image, onImageChange, disabled }) {
  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl">
      <h2 className="text-xl font-bold font-poppins text-primary mb-4">
        Profile Photo
      </h2>
      <div className="flex items-center gap-8 flex-col sm:flex-row">
        <div className="relative">
          <img
            alt="Mentor Profile Photo"
            className="w-40 h-40 rounded-full object-cover border-4 border-primary"
            src={
              image
                ? typeof image === "string"
                  ? image
                  : URL.createObjectURL(image)
                : "https://lh3.googleusercontent.com/aida-public/AB6AXuB70_AthWHBbSSXdChZhDODh_Qg1JAqWX6VfQkvtoeXos8wvBs6EXpROUxIc09EHfeuc-iTDc-3z0rCjWwm1kzjQ1WC5w_-09JVDFRlUNoGfZaifI1Xwz-I7EeelNYFvhZ7Ahn9hPsHt6mm4fd6xBDZ-ATMuEB8OLBwID-hQ7lMq6O4dx2M7T1m18IEL-bGH9OC3_TILg4gE72DRmZDFGeNgnWJTJNwbwL91lmo2hh5xb3mN11EPnmEtoag5fKFv2r_Ft3Fu1wC-Vs"
            }
          />
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <label className="text-primary text-center text-sm p-4 cursor-pointer">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
                disabled={disabled}
              />
            </label>
          </div>
        </div>
        <div className="flex-1">
          <div className="border-2 border-dashed border-default rounded-lg p-6 text-center bg-background">
            <FaCloudUploadAlt className="text-primary text-5xl mx-auto" />
            <p className="mt-2 text-sm text-primary">
              Drag & drop your photo here, or
              <label className="font-semibold link-primary ml-1 cursor-pointer">
                browse files
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                  disabled={disabled}
                />
              </label>
              .
            </p>
            <p className="text-xs text-secondary mt-1">
              JPG, PNG, WebP. Max 5MB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
