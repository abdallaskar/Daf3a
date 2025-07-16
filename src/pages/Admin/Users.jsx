import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'
import { getAllUsers } from '../../services/getAllData'

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.users || []); // Only store the users array
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  console.log(users);

  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h1 className="text-2xl font-bold text-primary">Users</h1>
              <button className="admin-btn">Add User</button>
            </div>
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-accent">
                  <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input className="input-field w-full pl-10 rounded-full border-2 border-accent bg-surface shadow focus:border-primary-brand focus:ring-2 focus:ring-accent/30 transition-all placeholder:text-secondary" placeholder="Search users..." type="search" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="card overflow-x-auto p-6">
              {loading ? (
                <div className="text-center text-accent mb-4">Loading users...</div>
              ) : null}
              <table className="w-full text-left">
                <thead>
                  <tr className="border-default border-b">
                    <th className="p-4 text-sm font-semibold text-primary">Name</th>
                    <th className="p-4 text-sm font-semibold text-primary">Email</th>
                    <th className="p-4 text-sm font-semibold text-primary">Role</th>
                    <th className="p-4 text-sm font-semibold text-primary">Phone Number</th>
                      <th className="p-4 text-sm font-semibold text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">{user.name}</td>
                      <td className="p-4 typography_body whitespace-nowrap">{user.email}</td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                           className={`px-2 py-1 text-xs font-semibold rounded-full
                             ${user.role === 'mentor' ? 'bg-blue-100 text-blue-800' : ''}
                             ${user.role === 'student' ? 'bg-orange-100 text-orange-800' : ''}
                           `}
                         >
                           {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                         </span>
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                         <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                           {user.phoneNumber}
                         </span>
                    </td>
                      <td className="p-4 typography_body whitespace-nowrap flex gap-2">
                        <button
                          className="p-1 rounded hover:bg-blue-100"
                          title="Edit"
                          onClick={() => {/* handle edit here */}}
                        >
                          {/* Edit icon (provided) */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button
                          className="p-1 rounded hover:bg-red-100"
                          title="Delete"
                          onClick={() => {/* handle delete here */}}
                        >
                          {/* Delete icon (provided) */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

