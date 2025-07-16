import { useContext, useEffect, useState } from "react";
import SkillsSection from "./SkillsSection";
import AvailabilitySelection from "./AvailabilitySelection";
import LanguagesSection from "./LanguagesSection";
import { UserContext } from "../../contexts/ProfileContext";
import { editUserProfile } from "../../services/mentorService";

// Add isRegistered prop to control registration logic
export default function MentorProfileForm({ user, isRegistered }) {
  const { refreshUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    languages: [],
    expertise: [],
    availability: [],
    links: [],
    experience: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // Skills section state
  const [skillsSearch, setSkillsSearch] = useState("");
  const [skillsError, setSkillsError] = useState("");
  // Languages section state
  const [languagesSearch, setLanguagesSearch] = useState("");
  const [languagesError, setLanguagesError] = useState("");
  // Availability section state
  const [selectedDay, setSelectedDay] = useState("");
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");
  const [tempSlots, setTempSlots] = useState([]);
  const [availabilityError, setAvailabilityError] = useState("");
  const [availabilitySuccess, setAvailabilitySuccess] = useState("");
  // Links state
  const [linkInput, setLinkInput] = useState("");
  const [linksError, setLinksError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        languages: user.languages || [],
        expertise: user.expertise || [],
        availability: user.availability || [],
        links: user.links || [],
        experience: user.experience || "",
      });
    }
    setLoading(false);
  }, [user]);

  // Basic info handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Languages section handlers
  const handleAddLanguage = (lang) => {
    setLanguagesError("");
    if (formData.languages.length >= 10) {
      setLanguagesError("You can add up to 10 languages.");
      return;
    }
    if (!formData.languages.includes(lang)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, lang],
      }));
    }
    setLanguagesSearch("");
  };
  const handleRemoveLanguage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== idx),
    }));
  };

  // Skills section handlers
  const handleAddSkill = (skill) => {
    setSkillsError("");
    if (formData.expertise.length >= 15) {
      setSkillsError("You can add up to 15 skills.");
      return;
    }
    if (!formData.expertise.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, skill],
      }));
    }
    setSkillsSearch("");
  };
  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((s) => s !== skill),
    }));
  };

  // Availability section handlers (same as before)
  function isOverlap(newStart, newEnd, slots) {
    const newStartMins = parseInt(newStart.split(":").join(""), 10);
    const newEndMins = parseInt(newEnd.split(":").join(""), 10);
    return slots.some(([start, end]) => {
      const startMins = parseInt(start.split(":").join(""), 10);
      const endMins = parseInt(end.split(":").join(""), 10);
      return newStartMins < endMins && newEndMins > startMins;
    });
  }
  const handleAddSlot = () => {
    setAvailabilityError("");
    setAvailabilitySuccess("");
    if (!slotStart || !slotEnd) {
      setAvailabilityError("Both start and end times are required.");
      return;
    }
    if (slotStart >= slotEnd) {
      setAvailabilityError("Start time must be before end time.");
      return;
    }
    if (isOverlap(slotStart, slotEnd, tempSlots)) {
      setAvailabilityError("This slot overlaps with an existing slot.");
      return;
    }
    setTempSlots([...tempSlots, [slotStart, slotEnd]]);
    setSlotStart("");
    setSlotEnd("");
    setAvailabilitySuccess("Slot added.");
  };
  const handleRemoveTempSlot = (idx) => {
    setTempSlots(tempSlots.filter((_, i) => i !== idx));
  };
  const handleAddDay = () => {
    setAvailabilityError("");
    setAvailabilitySuccess("");
    if (!selectedDay) {
      setAvailabilityError("Select a day.");
      return;
    }
    if (tempSlots.length === 0) {
      setAvailabilityError("Add at least one slot for this day.");
      return;
    }
    if (formData.availability.some((a) => a.day === selectedDay)) {
      setAvailabilityError("Day already added.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        {
          day: selectedDay,
          slots: tempSlots.map(([start, end]) => `${start}-${end}`),
        },
      ],
    }));
    setSelectedDay("");
    setTempSlots([]);
    setAvailabilitySuccess("Day and slots added.");
  };
  const handleRemoveDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.filter((a) => a.day !== day),
    }));
  };
  const handleRemoveSlot = (day, slotIdx) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.map((a) =>
        a.day === day
          ? { ...a, slots: a.slots.filter((_, i) => i !== slotIdx) }
          : a
      ),
    }));
  };
  // For slot input changes
  const handleSlotStartChange = (val) => setSlotStart(val);
  const handleSlotEndChange = (val) => setSlotEnd(val);
  const handleSelectedDayChange = (val) => {
    setSelectedDay(val);
    setTempSlots([]);
    setAvailabilityError("");
    setAvailabilitySuccess("");
  };

  // Links handlers
  const handleAddLink = () => {
    setLinksError("");
    if (!linkInput.trim()) return;
    if (formData.links.length >= 5) {
      setLinksError("You can add up to 5 links.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, linkInput.trim()],
    }));
    setLinkInput("");
  };
  const handleRemoveLink = (idx) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== idx),
    }));
  };

  // Unified handleSubmit for both register and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const { expertise, links, experience, languages, availability } =
        formData;
      const updatedUser = await editUserProfile({
        expertise,
        links,
        experience,
        languages,
        availability,
        isRegistered: true,
      });
      if (updatedUser) {
        setSuccess(
          isRegistered
            ? "Profile updated successfully!"
            : "Profile registered successfully!"
        );
        if (refreshUser) await refreshUser();
      }
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      {/* User Data Display */}
      {user && (
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-bold mb-2 text-primary">
            Mentor Profile Data
          </h2>
          <div className="mb-1">
            <span className="font-semibold">Name:</span> {user.name || "-"}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Email:</span> {user.email || "-"}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Experience:</span>{" "}
            {user.experience || "-"}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Languages:</span>{" "}
            {user.languages && user.languages.length > 0
              ? user.languages.join(", ")
              : "-"}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Expertise:</span>{" "}
            {user.expertise && user.expertise.length > 0
              ? user.expertise.join(", ")
              : "-"}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Links:</span>{" "}
            {user.links && user.links.length > 0
              ? user.links.map((l, i) => (
                  <a
                    key={i}
                    href={l}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mr-2"
                  >
                    {l}
                  </a>
                ))
              : "-"}
          </div>
        </section>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>
      )}
      <LanguagesSection
        languages={formData.languages}
        onAddLanguage={handleAddLanguage}
        onRemoveLanguage={handleRemoveLanguage}
        search={languagesSearch}
        onSearchChange={setLanguagesSearch}
        error={languagesError}
        disabled={submitting}
      />
      <SkillsSection
        skills={formData.expertise}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        search={skillsSearch}
        onSearchChange={setSkillsSearch}
        error={skillsError}
        disabled={submitting}
      />
      <AvailabilitySelection
        availability={formData.availability}
        onAddDay={handleAddDay}
        onRemoveDay={handleRemoveDay}
        onAddSlot={handleAddSlot}
        onRemoveSlot={handleRemoveSlot}
        tempSlots={tempSlots}
        onTempSlotChange={handleRemoveTempSlot}
        selectedDay={selectedDay}
        onSelectedDayChange={handleSelectedDayChange}
        slotStart={slotStart}
        slotEnd={slotEnd}
        onSlotStartChange={handleSlotStartChange}
        onSlotEndChange={handleSlotEndChange}
        error={availabilityError}
        success={availabilitySuccess}
        disabled={submitting}
      />
      {/* Mentor Links */}
      <section className="bg-surface card shadow-xl p-8 rounded-2xl">
        <h2 className="text-xl font-bold font-poppins text-primary mb-6">
          Links
        </h2>
        <div className="flex gap-2 mb-2">
          <input
            className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
            type="url"
            placeholder="Add a link (e.g. LinkedIn, Portfolio)"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            disabled={submitting}
          />
          <button
            type="button"
            className="btn-primary px-4 py-2 rounded"
            onClick={handleAddLink}
            disabled={submitting}
          >
            Add
          </button>
        </div>
        {linksError && (
          <div className="text-red-600 text-sm mb-2">{linksError}</div>
        )}
        <ul className="list-disc pl-6">
          {formData.links.map((link, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {link}
              </a>
              <button
                type="button"
                className="text-red-500 text-xs"
                onClick={() => handleRemoveLink(idx)}
                disabled={submitting}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
      {/* Mentor Experience */}
      <section className="bg-surface card shadow-xl p-8 rounded-2xl">
        <h2 className="text-xl font-bold font-poppins text-primary mb-6">
          Experience
        </h2>
        <textarea
          className="input-field w-full p-4 border border-input rounded-md text-secondary bg-background"
          name="experience"
          placeholder="Describe your experience..."
          rows="4"
          value={formData.experience}
          onChange={handleChange}
          disabled={submitting}
        ></textarea>
      </section>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded disabled:opacity-50"
          disabled={submitting}
        >
          {submitting
            ? "Saving..."
            : !isRegistered
            ? "Register"
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
