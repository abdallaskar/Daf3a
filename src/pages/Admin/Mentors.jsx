import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'
import { getAllMentors } from '../../services/getAllData'

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await getAllMentors();
        setMentors(response.mentors || []);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(search.toLowerCase()) ||
    mentor.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col p-6">
          <header className="border-default border-b bg-surface px-8 py-6 rounded-t-lg shadow-sm mb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary">Mentors</h1>
              <div className="flex items-center gap-4">
                <button className="admin-btn">Add Mentor</button>
              </div>
            </div>
          </header>
          <main className="flex-1">
            <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
              <div className="flex border-default border-b mb-6">
                <a className="border-b-2 border-primary px-4 py-3 text-sm font-bold text-primary" href="#">Directory</a>
                <a className="border-b-2 border-transparent px-4 py-3 text-sm font-bold text-secondary hover:border-hover hover:text-primary" href="#">Applications</a>
                <a className="border-b-2 border-transparent px-4 py-3 text-sm font-bold text-secondary hover:border-hover hover:text-primary" href="#">Onboarding</a>
              </div>
              <div className="card p-6 mt-4">
                <div className="mb-4">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg aria-hidden="true" className="h-5 w-5 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" fillRule="evenodd"></path>
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
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Sessions</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Rating</th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Last Active</th>
                          <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-default bg-surface">
                        {filteredMentors.map(mentor => (
                          <tr key={mentor._id}>
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
                                  <div className="text-sm text-secondary">
                                    {mentor.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{mentor.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${mentor.isRegistered ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                {mentor.isRegistered ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary">{mentor.sessions || 0}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary">{mentor.rating || 0}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary">{mentor.lastActive || 'N/A'}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <a className="text-link hover:text-blue-700" href="#">Edit</a>
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
  )
}
