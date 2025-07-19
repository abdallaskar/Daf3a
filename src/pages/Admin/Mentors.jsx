
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'
import { getAllMentors } from '../../services/getAllData'
import { verfiyMentor, deleteMentor } from '../../services/adminServices';


export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState('directory');
  const [verifyingId, setVerifyingId] = useState(null); // For button loading state

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await getAllMentors();
        console.log("API response:", response);
        setMentors(response || []);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  console.log(mentors)

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(search.toLowerCase()) ||
    mentor.email.toLowerCase().includes(search.toLowerCase())
  );

  let displayedMentors = filteredMentors;
  if (activeTab === 'applications') {
    displayedMentors = filteredMentors.filter(mentor => !mentor.verified);
  } else if (activeTab === 'onboarding') {
    displayedMentors = filteredMentors.filter(mentor => mentor.verified);
  }

  const handleVerifyMentor = async (mentorId) => {
    setVerifyingId(mentorId);
    try {
      await verfiyMentor(mentorId);
      setMentors(prev =>
        prev.map(m => m._id === mentorId ? { ...m, verified: true } : m)
      );
    } catch {
      alert('Failed to verify mentor');
    } finally {
      setVerifyingId(null);
    }
  };

  const handleDeleteMentor = async (mentorId) => {
    if (!window.confirm('Are you sure you want to delete this mentor?')) return;
    try {
      await deleteMentor(mentorId);
      setMentors(mentors => mentors.filter(m => m._id !== mentorId));
    } catch {
      alert('Failed to delete mentor.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 bg-background">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col p-6">
          <header className="border-default border-b bg-surface px-8 py-6 rounded-t-lg shadow-sm mb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary">Mentors</h1>
            </div>
          </header>
          <main className="flex-1">
            <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
              <div className="flex border-default border-b mb-6">
                <a
                  className={`border-b-2 px-4 py-3 text-sm font-bold cursor-pointer ${activeTab === 'directory' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:border-hover hover:text-primary'}`}
                  onClick={() => setActiveTab('directory')}
                >
                  Directory
                </a>
                <a
                  className={`border-b-2 px-4 py-3 text-sm font-bold cursor-pointer ${activeTab === 'applications' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:border-hover hover:text-primary'}`}
                  onClick={() => setActiveTab('applications')}
                >
                  Applications
                </a>
                <a
                  className={`border-b-2 px-4 py-3 text-sm font-bold cursor-pointer ${activeTab === 'onboarding' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:border-hover hover:text-primary'}`}
                  onClick={() => setActiveTab('onboarding')}
                >
                  Onboarding
                </a>
              </div>
              <div className="card p-6 mt-4">
                <div className="mb-4">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>

                    <input className="input-field w-full pl-10" placeholder="Search mentors" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="text-center text-accent mb-4">Loading mentors...</div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-surface">
                          <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-black">Name</th>
                          <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-black">Verified</th>
                          <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-black">Expertise</th>
                          <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-black">Rating</th>
                          <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-black">Registered</th>
                          <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-black">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-default bg-surface">
                        {displayedMentors.map(mentor => (
                          <tr key={mentor._id}>
                            {/* Name */}
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    alt={mentor.name}
                                    className="h-10 w-10 rounded-full"
                                    src={mentor.image || "https://via.placeholder.com/40x40?text=No+Image"}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-primary">
                                    {mentor.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            {/* Verified */}
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                              {mentor.verified ? (
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Verified</span>
                              ) : (
                                <>
                                  <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">Not Verified</span>
                                  <button
                                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                                    onClick={() => handleVerifyMentor(mentor._id)}
                                    disabled={verifyingId === mentor._id}
                                  >
                                    {verifyingId === mentor._id ? 'Verifying...' : 'Verify'}
                                  </button>
                                </>
                              )}
                            </td>
                            {/* Expertise */}
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary">
                              {mentor.expertise && mentor.expertise.length > 0 ? mentor.expertise.join(", ") : "No expertise listed"}
                            </td>
                            {/* Rating */}
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary">
                              <span className="flex items-center gap-1">
                                {mentor.rating && mentor.rating > 0 ? mentor.rating : "Not Rated"}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFA500" viewBox="0 0 24 24" stroke="#FFA500" strokeWidth={1.5} className="size-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                              </span>
                            </td>
                            {/* Registered */}
                            <td className={`whitespace-nowrap px-6 py-4 text-sm`}>
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${mentor.isRegistered ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                {mentor.isRegistered ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            {/* Actions */}
                            <td className="whitespace-nowrap px-6 py-4 flex gap-2">
                              <button
                                className="p-1 rounded hover:bg-red-100"
                                title="Delete"
                                onClick={() => handleDeleteMentor(mentor._id)}
                              >
                                {/* Delete icon (heroicon) */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
