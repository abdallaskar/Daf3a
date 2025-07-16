import React from "react";

const LANGUAGES = [
  "English",
  "Arabic",
  "French",
  "Spanish",
  "German",
  "Chinese",
  "Japanese",
  "Russian",
  "Hindi",
  "Portuguese",
  "Italian",
  "Turkish",
  "Korean",
  "Dutch",
  "Swedish",
  "Polish",
  "Greek",
  "Czech",
  "Danish",
  "Finnish",
];

export default function LanguagesSection({
  languages = [],
  onAddLanguage,
  onRemoveLanguage,
  search = "",
  onSearchChange,
  error = "",
  disabled = false,
}) {
  const maxLanguages = 10;

  const filteredLanguages = LANGUAGES.filter(
    (l) =>
      !languages.includes(l) &&
      l.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-surface card shadow-xl p-8 rounded-2xl mb-6">
      <label className="block text-sm font-medium text-secondary mb-1 font-poppins">
        Languages
      </label>
      <div className="relative mb-2">
        <input
          className="input-field w-full pr-10 py-1 text-secondary bg-input border-input border px-2"
          placeholder="Search for a language (e.g. English)"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
          disabled={disabled}
        />
        {search && filteredLanguages.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-surface border border-default rounded shadow mt-1 max-h-40 overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <li
                key={lang}
                className="px-4 py-2 cursor-pointer hover:bg-primary-light text-primary"
                onClick={() => onAddLanguage(lang)}
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
      <p className="text-xs text-secondary mb-2">
        Add up to {maxLanguages} languages. Search and select from the list.
      </p>
      <div className="flex flex-wrap gap-2">
        {languages.length === 0 && (
          <span className="text-xs text-secondary">No languages added.</span>
        )}
        {languages.map((lang, idx) => (
          <span
            key={lang}
            className="flex items-center bg-primary-light text-primary text-xs font-medium px-2 py-1 rounded-full"
          >
            {lang}
            <button
              className="ml-2 text-red-500 hover:underline"
              type="button"
              onClick={() => onRemoveLanguage(idx)}
              disabled={disabled}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}
