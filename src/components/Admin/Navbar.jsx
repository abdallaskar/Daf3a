import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { useNavigate } from 'react-router';

export default function Navbar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken && setToken(null);
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

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
          Df3a Admin Panel
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
        {/* User Icon and Name only, no dropdown */}
        <div className="flex items-center gap-2">
          <div className="size-10 flex items-center justify-center rounded-full bg-primary-light border border-default">
            <svg className="w-7 h-7 text-brand" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-6 2-6 4v1h12v-1c0-2-2-4-6-4z" />
            </svg>
          </div>
          <span className="text-primary font-medium text-base select-none">{user?.name || 'Admin'}</span>
          <button
            onClick={handleLogout}
            className="flex h-12 min-w-[110px] items-center btn-primary justify-center rounded-lg px-6 text-base  shadow-md hover:!bg-red-700 m-2"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
