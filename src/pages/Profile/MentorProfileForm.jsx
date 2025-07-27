import { useContext, useEffect, useState } from "react";
import SkillsSection from "./SkillsSection";
import LanguagesSection from "./LanguagesSection";
import { UserContext } from "../../contexts/ProfileContext";
import { editUserProfile } from "../../services/profileService";
import { MentorProfileSchema } from "../../utils/Schema";
import { AuthContext } from "../../contexts/AuthContextProvider";
import Loading from "../../components/Loading/Loading";

// Add isRegistered prop to control registration logic
export default function MentorProfileForm({ isRegistered }) {
  const { user } = useContext(AuthContext);
  const { refreshUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    languages: [],
    expertise: [],
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
  // Links state
  const [linkInput, setLinkInput] = useState("");
  const [linksError, setLinksError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        languages: user.languages || [],
        expertise: user.expertise || [],
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
    setValidationErrors({});
    try {
      MentorProfileSchema.parse(formData);
      const { expertise, links, experience, languages } = formData;
      const updatedUser = await editUserProfile({
        expertise,
        links,
        experience,
        languages,
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
      setTimeout(() => {
        setSuccess("");
        setSubmitting(false);
      }, 2000);
    } catch (err) {
      if (err.errors) {
        // zod error
        const errors = {};
        err.errors.forEach((e) => {
          errors[e.path[0]] = e.message;
        });
        setValidationErrors(errors);
      } else {
        setError("Failed to save profile. Please try again.");
      }
      setSubmitting(false);
      return;
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
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
        error={languagesError || validationErrors.languages}
        disabled={submitting}
      />
      <SkillsSection
        skills={formData.expertise}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        search={skillsSearch}
        onSearchChange={setSkillsSearch}
        error={skillsError || validationErrors.expertise}
        disabled={submitting}
      />
      {/* AvailabilitySelection removed */}
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
        {validationErrors.links && (
          <div className="text-red-600 text-sm mb-2">
            {validationErrors.links}
          </div>
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
        {validationErrors.experience && (
          <div className="text-red-600 text-sm mb-2">
            {validationErrors.experience}
          </div>
        )}
      </section>
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary  py-2 px-6 rounded disabled:opacity-50"
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
