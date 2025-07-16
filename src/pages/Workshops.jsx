import React from "react";

const workshops = [
  {
    title: "Digital Marketing Masterclass",
    date: "Oct 26, 2024 · 10:00 AM",
    price: "$50.00",
    priceColor: "text-[var(--teal)]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCi2HROkyJ7YKQD7LL0Brv_DgJ6Z2SdLxExHJROUT98RoXh0QSfMzMcRia5cItm8xgvb56wX-bSghRce4XP70dIdpELH-l4nIskXBMvIC2UI39rvx-8dfYyzBWe-50qRwaBjszChPLdEQkgmQGQ41bRAawl3PvVA3LDcfDgfTzfzoEW_XoIFn6eHdhDU_x785dqtUvpKYvFuMVJGkPXr2lEeAJMvJP0zKEjqbPW8Qno3-2v0sAAeTENNP1edV01ncxx1-1uaybKUDU",
    tags: [
      { label: "Live", className: "bg-red-100 text-red-800" },
      { label: "Virtual", className: "bg-purple-100 text-purple-800" },
      { label: "English", className: "bg-gray-200 text-gray-800" },
    ],
    mentor: {
      name: "Karim Adel",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCmCLL-ZL14PVeigDIJrfhkC-dNvVax2xBZVgmeFtA-0ptAPRKhKJyAFRlOMs37Mapp4mz6-VjYbcSanvlpbIZZb8RfGjU32cebe9fcJi601A6HUWkMAgoRH2IF_dYP7gyd4x94cxspgkWszmrj5cCgaFdqmItH2V-Ayx8-hyFKXFq9Ysvp82xMyqW0xkh3GQqH9TVCdvBMQEuGIrie9lyTzJ-5R2wpui0QPq-g80iYppFL4vSHA0eoMYDPpqqbT4gTx8NubXrUaDQ",
      rating: 4.9,
      reviews: 120,
    },
  },
  {
    title: "Data Science Fundamentals",
    date: "Nov 5, 2024 · 2:00 PM",
    price: "Free",
    priceColor: "text-green-600",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTcWWs8D3tRIGnrzkyMVn8UiIljIVOWCRZ7hGtIvCk-ZHi09bzZ7erw3JDvk5Ls4aEh8sB6zzSpyPgcUljHuS_dyv44lD7TFsKy_XOVRVRjvPKynyg1yxlQbj8gamWZZyCBX86IRiuxtmmRVzE7i07zr_vMGXUNSNe6TsaVVk4o5g3zctxf-pCD0FPGqGbRTDmqGcmV1xMEoYwmM-fouRSEBXxHdI1vC5AFoaTfwmITVyktKWgdbd5saKvpVItnHwCnEhiz-dIPVc",
    tags: [
      { label: "Live", className: "bg-red-100 text-red-800" },
      { label: "On-site", className: "bg-blue-100 text-blue-800" },
      { label: "English", className: "bg-gray-200 text-gray-800" },
    ],
    mentor: {
      name: "Fatima Al-Sayed",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1-BguGyuFFkxmL_t_zHQahH47jfvma3OEltYovvU4c6zqalYZLKAMjifhuANAZGuFJ-0Mu7baFeJLxgFtRkQgVCyX1qBtz03OgNy_mQgHJInUB-ktBqPJVnxQFY_OPOhWLua7JKLVEuE7-eM5Oeib7tr1NExTRZw4cV-dcnAXcB-eOyYsxRUIYpAvo-GQ0oD9LFy6xTeuvE8TzsQlNyEsp1ZhhHcgtVGquLP_yni--bHhTibNGQK3VvFp-kkPyc9QQuRpRRebFY",
      rating: 5.0,
      reviews: 98,
    },
  },
  {
    title: "UI/UX Design Essentials",
    date: "Nov 12, 2024 · 11:00 AM",
    price: "$75.00",
    priceColor: "text-[var(--teal)]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-6aSjTSAurmkP2W1l8_xjN9wYb73Ej66ssM03i5khTemikqMhkcJZGuaNdAOH6iN-1dkkyeTulwVOlAI9ywI-w0wk9TqgL-QcdzwHku7ubkJEJ0KvImQsy7_5RVce5gVWwQhjReMxjyp9eYNREappKtEWjoyDbNtAbya5QUMZ1Gcpq5_WwjJfC-toUrqJUHkpFK2QECMsEuZNuFIH2mpGA7Mlwz0F0ThwFrCmvb-EcVsZruHHRcjiFUZLaTxwJVyFaBuh06ZO6ME",
    tags: [
      { label: "Live", className: "bg-red-100 text-red-800" },
      { label: "Virtual", className: "bg-purple-100 text-purple-800" },
      { label: "English", className: "bg-gray-200 text-gray-800" },
    ],
    mentor: {
      name: "Layla Hassan",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDP6AzuTwL1Gzsgkwop7-Bry8KEaKeN48dCcxuZsLp_61Y39XrLBPjasKyMOoeEfS5KR6SpvGGO4saiG9gqTBDUaGuw04tOBaTz6ai9H2i17f9zrV7FpcCiw9ctycjCWdDuFFkbvmko4JtSEMhFfJC1LW7Epj58dUBlWzMOJtowtTI4r-7x1jbPecy7Zinoay-10ceHx28zo9DnYEaBGWXn7AQ1AdSW-CO2w6TYO1T_Jq-BwaCWhQ2vC6SgnKyHEnDBVPBr1IeQ7YY",
      rating: 4.8,
      reviews: 215,
    },
  },
  {
    title: "Entrepreneurship Bootcamp",
    date: "Nov 26, 2024 · 9:00 AM",
    price: "$150.00",
    priceColor: "text-[var(--teal)]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0Nj45k4zqneFrTk2xfl13Ca_GtPTU2rCriy66P1J58vb9V2aAaHuI9WybPCKPy3glUVLKJJyGlv1pv3PvHkCFqZ7qgk4uCY6WXRxj9SCOjIw3aM9WhnPUuXIbRGF_-hHl7fgKcrlmj0WSpDPZupIO3zqMZodapfDVMtCOaJXSU7H9Uf0Oa2UcHeHb0EtmgRllJ8qVwLn1nwNUvK4hR5zSTTS6tcZf4PoB0Hmh39rAbJxGj2Q1yO6Kll4cAMsxtd-oquD9LXilQQM",
    tags: [
      { label: "Live", className: "bg-red-100 text-red-800" },
      { label: "On-site", className: "bg-blue-100 text-blue-800" },
      { label: "English", className: "bg-gray-200 text-gray-800" },
    ],
    mentor: {
      name: "Ahmed Mansour",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDyJJC3ziaHGosCZAA1GHc1He_wuzkh4UQC3dfubjYeDD61zzHwx34DidQvBl-ag9Feo8a16ESIHHyLE17c1nz1Wsb8tjieaqwtlcqftiIskhx1l01FwB5Wr0mvL3cMfS-9uGHiGEbZyrBfLgirrrITXD6SZ75t4kHkhWg52CGxUgE4WbutehzBPdLCDhbBap34tqef9T8hAZpev10tSUjYpCWg9JlYZ-1kdAvnvMSN9zLNBVh9ek7Bk9ZSeUmkx3y2Bl5D7Gqa62s",
      rating: 4.9,
      reviews: 302,
    },
  },
];

const filterButtons = [
  "Skill",
  "Topic",
  "Date",
  "Price",
  "Mentor Rating",
  { label: "Language: English", className: "bg-blue-100 text-[var(--accent-blue)] border-[var(--accent-blue)]" },
  "Location",
];

const sortButtons = [
  { label: "Soonest", active: true },
  { label: "Highest Rated", active: false },
  { label: "Lowest Price", active: false },
];

export default function Workshops() {
  return (
    <div className="min-h-screen">
      <main className="bg-background container mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar & Filters */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm pt-6 pb-4 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                className="w-full border border-gray-200 rounded-full py-3 px-6 text-base focus:ring-[var(--teal)] focus:border-[var(--teal)] placeholder-gray-400 pl-12"
                placeholder="Search for workshops, skills, mentors..."
                type="search"
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
              {filterButtons.map((btn, i) =>
                typeof btn === "string" ? (
                  <button
                    key={btn}
                    className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-[var(--dark-text)] hover:bg-gray-50 flex items-center gap-2"
                  >
                    {btn}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </button>
                ) : (
                  <button
                    key={btn.label}
                    className={`filter-button ${btn.className} border border-gray-200 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2`}
                  >
                    {btn.label}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        {/* Title & Sorters */}
        <div className="flex justify-between items-center mb-6 mt-6">
          <h1 className="text-3xl font-bold font-poppins">Workshops</h1>
          <div className="flex items-center gap-6 border-b">
            {sortButtons.map((btn) => (
              <button
                key={btn.label}
                className={`pb-3 border-b-2 text-sm font-semibold ${
                  btn.active
                    ? "border-[var(--teal)] text-[var(--dark-text)]"
                    : "border-transparent text-gray-500 hover:text-[var(--dark-text)]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        {/* Workshops Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {workshops.map((ws, idx) => (
            <div key={ws.title} className="bg-surface rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] flex flex-col">
              <img alt={ws.title} className="w-full h-40 object-cover" src={ws.image} />
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  {ws.tags.map((tag) => (
                    <span key={tag.label} className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tag.className}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold font-poppins flex-grow">{ws.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{ws.date}</p>
                <div className="flex items-center gap-3 mb-4">
                  <img alt="Mentor" className="w-10 h-10 rounded-full" src={ws.mentor.image} />
                  <div>
                    <p className="font-semibold text-sm">
                      {ws.mentor.name}
                      <svg className="h-4 w-4 inline text-[var(--accent-blue)]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          clipRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 11a1 1 0 112 0v1a1 1 0 11-2 0v-1zm1-4a1 1 0 100 2 1 1 0 000-2z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[var(--amber)]">
                      {ws.mentor.rating}
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      ({ws.mentor.reviews})
                    </div>
                  </div>
                </div>
                <p className={`text-xl font-bold mb-4 ${ws.priceColor}`}>{ws.price}</p>
                <a className="bg-[var(--teal)] text-white font-bold py-3 px-6 rounded-lg w-full text-center hover:bg-opacity-90 transition-colors mt-auto" href="#">
                  Register
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 