import React, { useState } from "react";
import { useProfile } from "../../contexts/ProfileContext";

const SKILLS = [
  { name: "JavaScript", category: "Technical" },
  { name: "React", category: "Technical" },
  { name: "Node.js", category: "Technical" },
  { name: "Python", category: "Technical" },
  { name: "Agile Methodologies", category: "Business" },
  { name: "Project Management", category: "Business" },
  { name: "Communication", category: "Business" },
  { name: "UI/UX Design", category: "Technical" },
  { name: "Team Leadership", category: "Business" },
  { name: "Data Analysis", category: "Technical" },
];

export default function SkillsSection() {
  const { profile, setProfile } = useProfile();
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const maxSkills = 15;

  if (!profile) return null;

  // Split skills into technical/business for display
  const technical = profile.expertise?.filter(skill =>
    SKILLS.find(s => s.name === skill && s.category === "Technical")
  ) || [];
  const business = profile.expertise?.filter(skill =>
    SKILLS.find(s => s.name === skill && s.category === "Business")
  ) || [];

  const filteredSkills = SKILLS.filter(
    s =>
      !profile.expertise?.includes(s.name) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSkill = (skill) => {
    setError("");
    if ((profile.expertise?.length || 0) >= maxSkills) {
      setError(`You can add up to ${maxSkills} skills.`);
      return;
    }
    setProfile({ ...profile, expertise: [...(profile.expertise || []), skill.name] });
    setSearch("");
  };

  const handleRemoveSkill = (skill) => {
    setProfile({
      ...profile,
      expertise: profile.expertise.filter(s => s !== skill),
    });
  };

  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl">
      <h2 className="text-xl font-bold font-poppins text-primary mb-6">Skills & Expertise</h2>
      <div className="relative mb-2">
        <input
          className="input-field w-full pr-10 py-1 text-secondary bg-input border-input border px-2"
          placeholder="Search for skills like 'Product Management'"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoComplete="off"
        />
        {search && filteredSkills.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-surface border border-default rounded shadow mt-1 max-h-40 overflow-y-auto">
            {filteredSkills.map(skill => (
              <li
                key={skill.name}
                className="px-4 py-2 cursor-pointer hover:bg-primary-light text-primary"
                onClick={() => handleSelectSkill(skill)}
              >
                {skill.name} <span className="text-xs text-secondary ml-2">({skill.category})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
      <p className="text-xs text-secondary mb-2">Add up to {maxSkills} skills. Search and select from the list.</p>
      <div className="mt-4 space-y-3">
        <h3 className="text-md font-semibold font-poppins text-primary">Technical</h3>
        <div className="flex flex-wrap gap-2">
          {technical.length === 0 && <span className="text-xs text-secondary">No technical skills added.</span>}
          {technical.map((skill) => (
            <div key={skill} className="flex items-center bg-primary-light text-primary text-sm font-medium px-3 py-1.5 rounded-full">
              <span>{skill}</span>
              <button
                className="material-icons text-base ml-2 cursor-pointer text-red-500"
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <h3 className="text-md font-semibold font-poppins text-primary mt-4">Business</h3>
        <div className="flex flex-wrap gap-2">
          {business.length === 0 && <span className="text-xs text-secondary">No business skills added.</span>}
          {business.map((skill) => (
            <div key={skill} className="flex items-center bg-primary-light text-primary text-sm font-medium px-3 py-1.5 rounded-full">
              <span>{skill}</span>
              <button
                className="material-icons text-base ml-2 cursor-pointer text-red-500"
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
