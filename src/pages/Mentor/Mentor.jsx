import { useContext, useEffect, useState } from "react";
import { MentorContext } from "../../contexts/ProfileContext";
import { useNavigate } from "react-router";
import PhotoSection from "./PhotoSection";
import BasicInfo from "./BasicInfo";
import SkillsSection from "./SkillsSection";
import AvailabilitySelection from "./AvailabilitySelection";
import LanguagesSection from "./LanguagesSection";

export default function MentorProfileForm() {
  const { mentor, updateMentor } = useContext(MentorContext);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    phoneNumber: "",
    languages: [],
    expertise: [],
    availability: [],
  });
  const [image, setImage] = useState(null);
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
  const navigate = useNavigate();

  useEffect(() => {
    if (mentor) {
      setFormData({
        name: mentor.name || "",
        title: mentor.title || "",
        bio: mentor.bio || "",
        phoneNumber: mentor.phoneNumber || "",
        languages: mentor.languages || [],
        expertise: mentor.expertise || [],
        availability: mentor.availability || [],
      });
      setImage(
        mentor.mentorImage
          ? `http://localhost:5000/uploads/${mentor.mentorImage}`
          : null
      );
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [mentor]);

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

  // Availability section handlers
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
        { day: selectedDay, slots: tempSlots.map(([start, end]) => `${start}-${end}`) },
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await updateMentor(formData, image);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 2000);
      // Optionally navigate or refresh
      // navigate("/");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}
      <PhotoSection image={image} onImageChange={handleImageChange} disabled={submitting} />
      <BasicInfo formData={formData} onChange={handleChange} disabled={submitting} />
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
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
