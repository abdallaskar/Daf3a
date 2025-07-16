import React from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'

export default function Users() {
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
                <input className="input-field w-full pl-10 rounded-full border-2 border-accent bg-surface shadow focus:border-primary-brand focus:ring-2 focus:ring-accent/30 transition-all placeholder:text-secondary" placeholder="Search users..." type="search" />
              </div>
            </div>
            <div className="card overflow-x-auto p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-default border-b">
                    <th className="p-4 text-sm font-semibold text-primary">Name</th>
                    <th className="p-4 text-sm font-semibold text-primary">Email</th>
                    <th className="p-4 text-sm font-semibold text-primary">Role</th>
                    <th className="p-4 text-sm font-semibold text-primary">Status</th>
                    <th className="p-4 text-sm font-semibold text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Ethan Carter
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      ethan.carter@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                        >Admin</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Olivia Bennett
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      olivia.bennett@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800"
                        >Mentor</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Liam Harper
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      liam.harper@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800"
                        >Inactive</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Ava Foster
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      ava.foster@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Noah Clark
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      noah.clark@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Isabella Reed
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      isabella.reed@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Mason Hayes
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      mason.hayes@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Sophia Turner
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      sophia.turner@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Jacob Powell
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      jacob.powell@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 typography_body whitespace-nowrap text-primary font-medium">
                      Mia Jenkins
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      mia.jenkins@email.com
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >User</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                        >Active</span
                      >
                    </td>
                    <td className="p-4 typography_body whitespace-nowrap">
                      <a
                        className="font-medium text-[var(--link-color)] hover:underline"
                        href="#"
                        >View</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

