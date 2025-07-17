import { useState, useEffect } from "react";
// import { createStudentProfile, editStudentProfile } from "../../services/studentService";

export default function StudentProfileForm({ mode = "create", student }) {
  const [formData, setFormData] = useState({
    education: "",
    skills: [],
    careerGoals: "",
    cvs: [], // array of File objects or URLs
  });
  const [skillsInput, setSkillsInput] = useState("");
  const [cvsInput, setCvsInput] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (student) {
      setFormData({
        education: student.education || "",
        skills: student.skills || [],
        careerGoals: student.careerGoals || "",
        cvs: student.cvs || [],
      });
    }
    setLoading(false);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (!skillsInput.trim()) return;
    if (formData.skills.length >= 15) return;
    if (!formData.skills.includes(skillsInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillsInput.trim()],
      }));
    }
    setSkillsInput("");
  };
  const handleRemoveSkill = (idx) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  // CV upload handlers
  const handleCvsChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      cvs: [...prev.cvs, ...files],
    }));
    setCvsInput([]);
  };
  const handleRemoveCv = (idx) => {
    setFormData((prev) => ({
      ...prev,
      cvs: prev.cvs.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      // if (mode === "create") {
      //   await createStudentProfile(formData);
      //   setSuccess("Profile registered successfully!");
      // } else {
      //   await editStudentProfile(formData);
      //   setSuccess("Profile updated successfully!");
      // }
      setSuccess("(Mock) Profile saved!");
      setTimeout(() => setSuccess("") , 2000);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}
      {/* Education */}
      <section className="bg-surface card shadow-xl p-8 rounded-2xl">
        <h2 className="text-xl font-bold font-poppins text-primary mb-6">Education</h2>
        <input
          className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
          name="education"
          type="text"
          placeholder="Your education (e.g. BSc Computer Science)"
          value={formData.education}
          onChange={handleChange}
          disabled={submitting}
        />
      </section>
      {/* Skills */}
      <section className="bg-surface card shadow-xl p-8 rounded-2xl">
        <h2 className="text-xl font-bold font-poppins text-primary mb-6">Skills</h2>
        <div className="flex gap-2 mb-2">
          <input
            className="input-field bg-input border-input border text-primary text-sm rounded-md px-4 py-3 block w-full"
            type="text"
            placeholder="Add a skill"
            value={skillsInput}
            onChange={e => setSkillsInput(e.target.value)}
            disabled={submitting}
          />
          <button type="button" className="btn-primary px-4 py-2 rounded" onClick={handleAddSkill} disabled={submitting}>Add</button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {formData.skills.map((skill, idx) => (
            <li key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
              {skill}
              <button type="button" className="text-red-500 text-xs" onClick={() => handleRemoveSkill(idx)} disabled={submitting}>x</button>
            </li>
          ))}
        </ul>
      </section>
      {/* Career Goals */}
      <section className="bg-surface card shadow-xl p-8 rounded-2xl">
        <h2 className="text-xl font-bold font-poppins text-primary mb-6">Career Goals</h2>
        <textarea
          className="input-field w-full p-4 border border-input rounded-md text-secondary bg-background"
          name="careerGoals"
          placeholder="Describe your career goals..."
          rows="4"
          value={formData.careerGoals}
          onChange={handleChange}
          disabled={submitting}
        ></textarea>
      </section>
      {/* CV Upload */}
      <section className="bg-surface card shadow-xl p-8 rounded-2xl">
        <h2 className="text-xl font-bold font-poppins text-primary mb-6">CVs</h2>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          type="file"
          multiple
          onChange={handleCvsChange}
          disabled={submitting}
        />
        <ul className="mt-2">
          {formData.cvs.map((cv, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {cv.name || cv}
              <button type="button" className="text-red-500 text-xs" onClick={() => handleRemoveCv(idx)} disabled={submitting}>Remove</button>
            </li>
          ))}
        </ul>
      </section>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "Saving..." : mode === "create" ? "Register" : "Save Changes"}
        </button>
      </div>
    </form>
  );
} 