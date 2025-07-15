import React, { useState } from 'react'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // Simulated admin data
  const admin = {
    name: 'Admin Name',
    photo: '' // Leave empty to show icon, or provide a URL for a real photo
  }

  return (
    <header className="header-glass bg-surface shadow-lg rounded-lg sticky top-0 z-10 flex h-20 items-center justify-between border-default border-b px-8 py-4 transition-theme">
      <div className="flex items-center gap-4">
        <div className="text-primary">
          <svg
            className="h-8 w-8 text-brand "
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <span className="font-poppins text-2xl font-bold text-primary">
          Df3a Admin
        </span>
      </div>
      <div className="flex items-center gap-6">
        {/* Notifications Bell */}
        <button className="relative p-2 rounded-full hover-surface transition-theme" aria-label="Notifications">
          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-accent rounded-full"></span>
        </button>
        {/* User Profile Dropdown with Icon/Photo and Name */}
        <div className="relative">
          <div className="flex items-center gap-2">
            {admin.photo ? (
              <button
                className="size-10 rounded-full bg-cover bg-center border border-default focus:outline-none"
                style={{ backgroundImage: `url('${admin.photo}')` }}
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="User menu"
              ></button>
            ) : (
              <button
                className="size-10 flex items-center justify-center rounded-full bg-primary-light border border-default focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="User menu"
              >
                <svg className="w-7 h-7 text-brand" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-6 2-6 4v1h12v-1c0-2-2-4-6-4z" />
                </svg>
              </button>
            )}
            <span className="text-primary font-medium text-base select-none">{admin.name}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-surface border border-default rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
              <a href="#profile" className="block px-4 py-2 text-primary hover-surface transition-theme">Profile</a>
              <a href="#settings" className="block px-4 py-2 text-primary hover-surface transition-theme">Settings</a>
              <div className="border-t border-default my-1"></div>
              <a href="#logout" className="block px-4 py-2 text-secondary hover-surface transition-theme">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
