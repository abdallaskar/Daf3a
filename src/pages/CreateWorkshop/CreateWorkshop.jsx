import React, { useState, useContext } from "react";
import { createWorkshop } from "../../services/workshopService";
import { useNavigate } from "react-router";
import { LuImageUp } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { BsCalendar2Check } from "react-icons/bs";
import { UserContext } from "../../contexts/ProfileContext";

const initialState = {
  title: "",
  description: "",
  dateTime: "",
  duration: "",
  topic: "",
  price: "",
  language: "English",
  coverImage: null,
  workshopType: "online",
  location: "",
  maxAttendees: "10",
};

const topics = [
  "Technical",
  "Business",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Career Development",
  "Entrepreneurship",
  "Soft Skills",
];

const languages = ["English", "Arabic"];

export default function CreateWorkshop() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleTypeChange = (e) => {
    setForm((prev) => ({
      ...prev,
      workshopType: e.target.value,
      location:
        e.target.value === "on-site" || e.target.value === "hybrid"
          ? prev.location
          : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Prepare data for backend
      let date = "";
      let time = "";
      if (form.dateTime) {
        const [d, t] = form.dateTime.split("T");
        date = d;
        time = t ? t.slice(0, 5) : "";
      }
      const data = {
        title: form.title,
        description: form.description,
        date,
        time,
        duration: form.duration,
        topic: form.topic,
        price: form.price,
        language: form.language,
        type: form.workshopType === "on-site" ? "offline" : form.workshopType, // map on-site to offline
        location: form.location,
        capacity: form.maxAttendees,
        user: user,
        // coverImage: form.coverImage, // handle file upload separately if needed
      };
      console.log(data);

      await createWorkshop(data);
      setSuccess("Workshop created successfully!");
      setTimeout(() => navigate("/workshops"), 1200);
    } catch (err) {
      setError("Failed to create workshop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // For preview
  const previewImage =
    form.coverImage && typeof form.coverImage === "object"
      ? URL.createObjectURL(form.coverImage)
      : null;

  return (
    <main className=" mx-auto z-10 bg-surface backdrop-blur-sm pb-4 px-6 rounded pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-primary">Create Workshop</h2>
            <p className="mt-3 text-lg text-secondary">
              Fill in the details below to set up your new workshop.
            </p>
          </div>
          <form
            className="bg-background rounded-xl shadow-soft p-8 space-y-8"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="text-primary" htmlFor="workshop-title">
                Workshop Title
              </label>
              <input
                className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3 block w-full p-2.5"
                id="workshop-title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Mastering Digital Marketing"
                type="text"
              />
            </div>
            <div>
              <label
                className="form-label text-primary"
                htmlFor="workshop-description"
              >
                Detailed Description
              </label>
              <textarea
                className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5"
                id="workshop-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of your workshop. Cover the topics, learning objectives, and what students can expect."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="form-label text-primary block"
                    htmlFor="date-time"
                  >
                    Date &amp; Time
                  </label>
                  <input
                    className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                    id="date-time"
                    name="dateTime"
                    value={form.dateTime}
                    onChange={handleChange}
                    type="datetime-local"
                  />
                </div>

                <div>
                  <label
                    className="form-label text-primary block"
                    htmlFor="duration"
                  >
                    Duration (in minutes)
                  </label>
                  <input
                    className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g., 90"
                    type="number"
                  />
                </div>

                <div>
                  <label
                    className="form-label text-primary block"
                    htmlFor="topic"
                  >
                    Topic
                  </label>
                  <select
                    className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    {topics.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="form-label text-primary block"
                    htmlFor="max-attendees"
                  >
                    Max number of attendees
                  </label>
                  <input
                    className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                    id="max-attendees"
                    name="maxAttendees"
                    value={form.maxAttendees}
                    onChange={handleChange}
                    placeholder="e.g., 25"
                    type="number"
                  />
                </div>

                <div>
                  <label
                    className="form-label text-primary block"
                    htmlFor="price"
                  >
                    Price (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary">
                      $
                    </span>
                    <input
                      className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full pl-8"
                      id="price"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="e.g., 50. Or leave blank for Free"
                      type="number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="form-label text-primary block"
                    htmlFor="language"
                  >
                    Language
                  </label>
                  <select
                    className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                    id="language"
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                  >
                    {languages.map((lang) => (
                      <option key={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="form-label text-primary"
                    htmlFor="workshopType"
                  >
                    Workshop Type
                  </label>
                  <select
                    className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                    id="workshopType"
                    name="workshopType"
                    value={form.workshopType}
                    onChange={handleTypeChange}
                  >
                    <option value="online">Online</option>
                    <option value="on-site">On-site</option>
                  </select>
                </div>

                {form.workshopType === "on-site" && (
                  <div>
                    <label
                      className="form-label text-primary"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      className="bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g., Cairo, Egypt"
                      type="text"
                    />
                  </div>
                )}
              </div>

              <label className="form-label text-primary">Cover Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-input">
                <div className="space-y-1 text-center">
                  <LuImageUp className="mx-auto h-12 w-12 text-primary" />
                  <div className="flex text-sm text-secondary">
                    <label
                      className="relative cursor-pointer rounded-md font-medium text-primary underline"
                      htmlFor="file-upload"
                    >
                      <span className="link-primary">Upload a file</span>
                      <input
                        className="sr-only"
                        id="file-upload"
                        name="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-secondary">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-end">
              <button
                className="flex h-12 min-w-[110px] items-center btn-primary justify-center rounded-lg px-6 text-base  shadow-md btn-primary:hover"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Workshop"}
              </button>
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {success && (
              <div className="text-green-500 text-center">{success}</div>
            )}
          </form>
        </div>
        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <h3
              className="text-2xl font-bold text-primary mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Workshop Preview
            </h3>
            <div className="bg-background rounded-xl shadow-soft overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    className="h-16 w-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    ></path>
                  </svg>
                )}
              </div>
              <div className="p-6">
                <h4
                  className="text-xl font-bold text-primary mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {form.title || "Your Workshop Title"}
                </h4>
                <p className="text-secondary mb-4 h-16 overflow-hidden">
                  {form.description ||
                    "Your workshop description will appear here..."}
                </p>
                <div className="flex items-center text-secondary text-sm mb-2">
                  <BsCalendar2Check className="h-5 w-5 mr-2 text-gray-400" />
                  <span>
                    {form.dateTime
                      ? new Date(form.dateTime).toLocaleString()
                      : "Date & Time"}
                  </span>
                </div>
                <div className="flex items-center text-[var(--text-secondary)] text-sm mb-4">
                  <IoLocationSharp className="h-5 w-5 mr-2 text-gray-400" />
                  <span>
                    {form.workshopType === "on-site" ||
                    form.workshopType === "hybrid"
                      ? form.location || "Location"
                      : "Online"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="text-2xl font-bold text-primary"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {form.price === "" || form.price === "0"
                      ? "Free"
                      : `$${form.price}`}
                  </span>
                  <div className="flex items-center">
                    <div
                      className="w-8 h-8 rounded-full bg-cover bg-center border-2 border-white"
                      style={{
                        backgroundImage:
                          user && user.image
                            ? `url('${user.image}')`
                            : "none",
                      }}
                    ></div>
                    <span className="ml-2 font-semibold text-primary">
                      {user ? user.name : "Your Name"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Preview */}
      </div>
    </main>
  );
}
