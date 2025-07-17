import React from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'

export default function Reviews() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
            <div className="text-2xl font-bold text-primary mb-8">Reviews Management</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="card col-span-1 md:col-span-3 p-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Overall Rating</h2>
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-bold text-primary">4.5</p>
                    <div className="flex text-accent">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                </svg>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                </svg>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                </svg>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d="M10 15.585l-4.243 2.13.81-4.723L2.94 9.384l4.74-.688L10 4.415l2.32 4.282 4.74.688-3.627 3.608.81 4.723L10 15.585zM10 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 13.31l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" fillRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-base mt-2">120 reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">5</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">40%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">4</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">30%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">3</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '15%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">15%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">2</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '10%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">10%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-secondary">1</span>
                      <div className="w-full bg-surface rounded-full h-2.5">
                        <div className="bg-accent h-2.5 rounded-full" style={{width: '5%'}}></div>
                      </div>
                      <span className="text-sm text-secondary">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Recent Reviews</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <img
                    alt="Sophia Clark avatar"
                    className="w-12 h-12 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg1Ired0jXqcp_cVkZNBNojV3dNEfYHzNh9PBvYp5Sw9YjsPz1YTc2Xelm_wkb8zE4ZFrc3OuWQMYaTnpKZLE2L446gAblZLoAZgk6gw68-V25w0i_QkLZh3OynkYwvm9c8hjetBJLkh_kufxcQiQ8bFgqh03ecIp3IdtknTxkfpRqIanS2EIXpx4MrWBGsUCcsifWLdG8URCP8EXVoAiby-uPIlwuI1z6_kc87btAfJMi5AB6Ybi4xTdUdufNSKZIg9TterL4ntpg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-primary">
                        Sophia Clark
                      </p>
                      <p className="text-sm text-secondary">
                        2 days ago
                      </p>
                    </div>
                    <div className="flex text-accent my-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                    </div>
                    <p className="typography_body">
                      The mentor was incredibly knowledgeable and provided
                      valuable insights. I highly recommend this workshop!
                    </p>
                    <div className="flex gap-4 mt-2 text-secondary">
                      <button
                        className="flex items-center gap-1 hover:text-link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H9.5a2 2 0 01-2-2V9.5a2 2 0 012-2h2.5V5a2 2 0 012-2h.5a2 2 0 012 2v5z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        15
                      </button>
                      <button
                        className="flex items-center gap-1 hover:text-link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3H14.5a2 2 0 012 2v9.5a2 2 0 01-2 2h-2.5v2a2 2 0 01-2 2h-.5a2 2 0 01-2-2v-5z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        2
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="flex gap-4">
                  <img
                    alt="Ethan Bennett avatar"
                    className="w-12 h-12 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJL2p4Ceq8GRKkIqdWvScoT2Fm2q6V31sYcLOl4AFO8NUzv6ITK6L6EM6oy9Ikci8frQjUtEFjZzr7u_0BHKh6fph0gAc6L2Ggr-JwTTbMazKWk5scXUW0-OIgbiYcy8dlpfExqPbFWcgywlmKWPWQB5EEo9XSLpN6y0Gcp807eDybAyD0KQpzQmVuMzgpzPDjfLqrDZW9vMVHkDwLgklBGCVX4Z9U10Y1Tc9hSy8ZIREtEmAAINSXrkiLyg2ZfCwxTXDTlib7fq12"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-primary">
                        Ethan Bennett
                      </p>
                      <p className="text-sm text-secondary">
                        1 week ago
                      </p>
                    </div>
                    <div className="flex text-accent my-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                    </div>
                    <p className="typography_body">
                      The workshop was well-structured and covered a lot of
                      ground. I learned a lot, but it felt a bit rushed at
                      times.
                    </p>
                    <div className="flex gap-4 mt-2 text-secondary">
                      <button
                        className="flex items-center gap-1 hover:text-link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H9.5a2 2 0 01-2-2V9.5a2 2 0 012-2h2.5V5a2 2 0 012-2h.5a2 2 0 012 2v5z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        8
                      </button>
                      <button
                        className="flex items-center gap-1 hover:text-link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3H14.5a2 2 0 012 2v9.5a2 2 0 01-2 2h-2.5v2a2 2 0 01-2 2h-.5a2 2 0 01-2-2v-5z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        1
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="flex gap-4">
                  <img
                    alt="Olivia Carter avatar"
                    className="w-12 h-12 rounded-full"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnGOgUsox4XeuygYnJJZWCt2R4ozwOKiV6w3Ya1i1b2t6Z5WzIOgABKrFuYnLKG2hbyplfrq_4nUEMDQV6_ih7m3UUVKgrCgkAfu4oCsgG27ZeaW-Y-Zq_O46ZeMspPmi9QIgqnYTNyAnLwjwCHywPUd9zynmh56j5tLHgX21nhojGNhG28dIQ3mfvotRaagmUgLCJgDyQOvzvLTRkEGJ-_ATkzrgApaWTWOQ0mpuo8nwZrvAgLPInK6tgoVCRl1p8spWVAFTQKJ_r"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-primary">
                        Olivia Carter
                      </p>
                      <p className="text-sm text-secondary">
                        2 weeks ago
                      </p>
                    </div>
                    <div className="flex text-accent my-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.365-2.446a1 1 0 00-1.176 0l-3.365 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"></path>
                      </svg>
                    </div>
                    <p className="typography_body">
                      The content was relevant, but the mentor's delivery could
                      have been more engaging. Overall, it was an okay
                      experience.
                    </p>
                    <div className="flex gap-4 mt-2 text-secondary">
                      <button
                        className="flex items-center gap-1 hover:text-link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H9.5a2 2 0 01-2-2V9.5a2 2 0 012-2h2.5V5a2 2 0 012-2h.5a2 2 0 012 2v5z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        5
                      </button>
                      <button
                        className="flex items-center gap-1 hover:text-link"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3H14.5a2 2 0 012 2v9.5a2 2 0 01-2 2h-2.5v2a2 2 0 01-2 2h-.5a2 2 0 01-2-2v-5z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                        3
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-8">
                <nav
                  aria-label="Pagination"
                  className="flex items-center space-x-2"
                >
                  <a
                    className="text-secondary hover:text-link"
                    href="#"
                    ><svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        fillRule="evenodd"
                      ></path></svg
                  ></a>
                  <a
                    className="px-3 py-1 bg-link text-white rounded-md"
                    href="#"
                    >1</a
                  >
                  <a
                    className="px-3 py-1 text-link hover:bg-blue-100 rounded-md"
                    href="#"
                    >2</a
                  >
                  <a
                    className="px-3 py-1 text-link hover:bg-blue-100 rounded-md"
                    href="#"
                    >3</a
                  >
                  <span className="px-3 py-1 text-secondary"
                    >...</span
                  >
                  <a
                    className="px-3 py-1 text-link hover:bg-blue-100 rounded-md"
                    href="#"
                    >10</a
                  >
                  <a
                    className="text-secondary hover:text-link"
                    href="#"
                    ><svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        fillRule="evenodd"
                      ></path></svg
                  ></a>
                </nav>
              </div>
              </div>
            </div>
          </main>
          
        </div>
      </div>
   
  )
}

