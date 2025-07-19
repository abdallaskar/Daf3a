import React, { useRef } from "react";

const PLACEHOLDER =
  "https://ui-avatars.com/api/?name=User&background=eee&color=888&size=160";

export default function PhotoSection({
  image,
  onImageChange,
  disabled,
  clickable,
}) {
  const fileInputRef = useRef();

  const handleImageClick = () => {
    if (clickable && !disabled) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl flex flex-col items-center">
      <h2 className="text-xl font-bold font-poppins text-primary mb-6">
        Profile Photo
      </h2>
      <div
        className={`rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-primary shadow-lg object-cover overflow-hidden cursor-pointer ${
          disabled ? "opacity-50" : "hover:opacity-80"
        }`}
        onClick={handleImageClick}
        style={{ position: "relative" }}
      >
        <img
          src={image || PLACEHOLDER}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onImageChange}
          disabled={disabled}
        />
      </div>
    </section>
  );
}
