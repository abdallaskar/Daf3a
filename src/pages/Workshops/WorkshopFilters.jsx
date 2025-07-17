import React from "react";

const filterOptions = {
  // skill: ["Digital Marketing", "Data Science", "UI/UX Design", "Entrepreneurship"],
  topic: ["Marketing", "Programming", "Design", "Business","Digital Marketing", "Data Science", "UI/UX Design", "Entrepreneurship"],
  // date: ["Upcoming", "This Month", "Next Month"],
  price: ["Free", "Paied"],
  language: ["English", "Arabic", "French", "Spanish"],
  location: ["Virtual", "On-site"],
};

export default function WorkshopFilters({
  filters,
  onFilterChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="z-10 bg-surface backdrop-blur-sm pt-12 pb-4 px-6 rounded">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            className="w-full border border-gray-200 rounded-full py-3 px-6 text-base focus:ring-[var(--teal)] focus:border-[var(--teal)] placeholder-gray-400 pl-12"
            placeholder="Search for workshops, skills, mentors..."
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {/* Search Icon */}
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {Object.entries(filterOptions).map(([key, options]) => (
            <select
              key={key}
              className="bg-surface border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50"
              value={filters[key] || ""}
              onChange={(e) => onFilterChange(key, e.target.value)}
            >
              <option value="">Select {key.charAt(0).toUpperCase() + key.slice(1)}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </div>
  );
} 