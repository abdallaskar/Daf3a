import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";

export default function AdminWorkshops() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-primary">Workshops</h1>
              <button className="admin-btn">Create Workshop</button>
            </header>
            <div className="border-default border-b mb-6">
              <nav className="flex gap-8">
                <a
                  className="py-4 px-1 border-b-2 border-link text-link font-semibold"
                  href="#"
                >
                  Calendar
                </a>
                <a
                  className="py-4 px-1 border-b-2 border-transparent text-secondary hover:text-link hover:border-link"
                  href="#"
                >
                  Analytics
                </a>
                <a
                  className="py-4 px-1 border-b-2 border-transparent text-secondary hover:text-link hover:border-link"
                  href="#"
                >
                  Content Library
                </a>
              </nav>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <button className="admin-btn-icon">
                    <svg
                      fill="currentColor"
                      height="18px"
                      viewBox="0 0 256 256"
                      width="18px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                    </svg>
                  </button>
                  <h3 className="text-lg font-semibold">July 2024</h3>
                  <button className="admin-btn-icon">
                    <svg
                      fill="currentColor"
                      height="18px"
                      viewBox="0 0 256 256"
                      width="18px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="font-bold text-secondary">S</div>
                  <div className="font-bold text-secondary">M</div>
                  <div className="font-bold text-secondary">T</div>
                  <div className="font-bold text-secondary">W</div>
                  <div className="font-bold text-secondary">T</div>
                  <div className="font-bold text-secondary">F</div>
                  <div className="font-bold text-secondary">S</div>
                  <div className="col-start-4 p-2 rounded-full hover-surface cursor-pointer">
                    1
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    2
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    3
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    4
                  </div>
                  <div className="p-2 rounded-full bg-link text-inverse cursor-pointer">
                    5
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    6
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    7
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    8
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    9
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    10
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    11
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    12
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    13
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    14
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    15
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    16
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    17
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    18
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    19
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    20
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    21
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    22
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    23
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    24
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    25
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    26
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    27
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    28
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    29
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    30
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-center mb-4">
                  <h3 className="text-lg font-semibold">August 2024</h3>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="font-bold text-secondary">S</div>
                  <div className="font-bold text-secondary">M</div>
                  <div className="font-bold text-secondary">T</div>
                  <div className="font-bold text-secondary">W</div>
                  <div className="font-bold text-secondary">T</div>
                  <div className="font-bold text-secondary">F</div>
                  <div className="font-bold text-secondary">S</div>
                  <div className="col-start-5 p-2 rounded-full hover-surface cursor-pointer">
                    1
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    2
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    3
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    4
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    5
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    6
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    7
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    8
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    9
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    10
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    11
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    12
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    13
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    14
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    15
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    16
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    17
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    18
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    19
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    20
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    21
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    22
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    23
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    24
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    25
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    26
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    27
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    28
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    29
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    30
                  </div>
                  <div className="p-2 rounded-full hover-surface cursor-pointer">
                    31
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-primary text-center mb-6">
                Workshop Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4">
                <div className="card flex flex-col items-center justify-center p-6">
                  <p className="text-base text-secondary text-center">
                    Total Workshops
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2 text-center">
                    120
                  </p>
                </div>
                <div className="card flex flex-col items-center justify-center p-6">
                  <p className="text-base text-secondary text-center">
                    Average Attendance
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2 text-center">
                    75%
                  </p>
                </div>
                <div className="card flex flex-col items-center justify-center p-6">
                  <p className="text-base text-secondary text-center">
                    Average Feedback Score
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2 text-center">
                    4.5/5
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-primary">
                Content Library
              </h2>
              <div className="card overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-base text-secondary font-semibold">
                        Title
                      </th>
                      <th className="p-4 text-base text-secondary font-semibold">
                        Type
                      </th>
                      <th className="p-4 text-base text-secondary font-semibold">
                        Date
                      </th>
                      <th className="p-4 text-base text-secondary font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover-surface">
                      <td className="p-4 text-base text-link font-medium">
                        Workshop 1
                      </td>
                      <td className="p-4 text-base text-secondary">
                        Onboarding
                      </td>
                      <td className="p-4 text-base text-secondary">
                        2024-07-15
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover-surface">
                      <td className="p-4 text-base text-link font-medium">
                        Workshop 2
                      </td>
                      <td className="p-4 text-base text-secondary">
                        Skill Development
                      </td>
                      <td className="p-4 text-base text-secondary">
                        2024-07-22
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-link">
                          Upcoming
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover-surface">
                      <td className="p-4 text-base text-link font-medium">
                        Workshop 3
                      </td>
                      <td className="p-4 text-base text-secondary">
                        Leadership
                      </td>
                      <td className="p-4 text-base text-secondary">
                        2024-07-29
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-link">
                          Upcoming
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover-surface">
                      <td className="p-4 text-base text-link font-medium">
                        Workshop 4
                      </td>
                      <td className="p-4 text-base text-secondary">
                        Communication
                      </td>
                      <td className="p-4 text-base text-secondary">
                        2024-08-05
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-link">
                          Upcoming
                        </span>
                      </td>
                    </tr>
                    <tr className="hover-surface">
                      <td className="p-4 text-base text-link font-medium">
                        Workshop 5
                      </td>
                      <td className="p-4 text-base text-secondary">
                        Team Building
                      </td>
                      <td className="p-4 text-base text-secondary">
                        2024-08-12
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-link">
                          Upcoming
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
