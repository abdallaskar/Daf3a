import React, { useState } from "react";

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
  const [skills, setSkills] = useState({
    technical: [],
    business: [],
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const maxSkills = 15;

  const filteredSkills = SKILLS.filter(
    (s) =>
      !skills.technical.includes(s.name) &&
      !skills.business.includes(s.name) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSkill = (skill) => {
    setError("");
    if (skills.technical.length + skills.business.length >= maxSkills) {
      setError(`You can add up to ${maxSkills} skills.`);
      return;
    }
    if (skill.category === "Technical") {
      setSkills({ ...skills, technical: [...skills.technical, skill.name] });
    } else {
      setSkills({ ...skills, business: [...skills.business, skill.name] });
    }
    setSearch("");
  };

  const handleRemoveSkill = (category, idx) => {
    setSkills({
      ...skills,
      [category]: skills[category].filter((_, i) => i !== idx),
    });
  };

  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl">
      <h2 className="text-xl font-bold font-poppins text-primary mb-6">
        Skills & Expertise
      </h2>
      <label
        className="block text-sm font-medium text-secondary mb-1 font-poppins"
        htmlFor="skills"
      >
        Add Skills
      </label>
      <div className="relative mb-2">
        <input
          className="input-field w-full pr-10 py-1 text-secondary bg-input border-input border px-2"
          id="skills"
          placeholder="Search for skills like 'Product Management'"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        {search && filteredSkills.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-surface border border-default rounded shadow mt-1 max-h-40 overflow-y-auto">
            {filteredSkills.map((skill) => (
              <li
                key={skill.name}
                className="px-4 py-2 cursor-pointer hover:bg-primary-light text-primary"
                onClick={() => handleSelectSkill(skill)}
              >
                {skill.name}{" "}
                <span className="text-xs text-secondary ml-2">
                  ({skill.category})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
      <p className="text-xs text-secondary mb-2">
        Add up to {maxSkills} skills. Search and select from the list.
      </p>
      <div className="mt-4 space-y-3">
        <h3 className="text-md font-semibold font-poppins text-primary">
          Technical
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.technical.length === 0 && (
            <span className="text-xs text-secondary">
              No technical skills added.
            </span>
          )}
          {skills.technical.map((skill, idx) => (
            <div
              key={skill}
              className="flex items-center bg-primary-light text-primary text-sm font-medium px-3 py-1.5 rounded-full"
            >
              <span>{skill}</span>
              <button
                className="material-icons text-base ml-2 cursor-pointer text-red-500"
                type="button"
                onClick={() => handleRemoveSkill("technical", idx)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <h3 className="text-md font-semibold font-poppins text-primary mt-4">
          Business
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.business.length === 0 && (
            <span className="text-xs text-secondary">
              No business skills added.
            </span>
          )}
          {skills.business.map((skill, idx) => (
            <div
              key={skill}
              className="flex items-center bg-primary-light text-primary text-sm font-medium px-3 py-1.5 rounded-full"
            >
              <span>{skill}</span>
              <button
                className="material-icons text-base ml-2 cursor-pointer text-red-500"
                type="button"
                onClick={() => handleRemoveSkill("business", idx)}
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
