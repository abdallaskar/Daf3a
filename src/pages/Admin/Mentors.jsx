import React from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'

export default function Mentors() {
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
                <button className="admin-btn-secondary">Export CSV</button>
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
                    <input className="input-field w-full pl-10" placeholder="Search mentors" type="text" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-surface">
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Sessions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary">Last Active</th>
                        <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-default bg-surface">
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                alt=""
                                className="h-10 w-10 rounded-full"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoqrXIHSajSVyoOQI1_DnSGaGUTouVTbWxnbXSu7n_SQEO7o0NBLkB68fKWmnHR_x3oIHUJB3kUiD-TSH3nP0ttgleq_grOiUzVzpEnEMFMI7y601nHfzcZddATT-6FZxEKs0F4XQg2Um6F752IEm2bbEoeszuiWyi8IYeidATWG4uve9Gx6GcPMG60--BIeCJuCIpwBxGYMObWnXVRsUBApwRY0TckqSMJkdkduu0g1rC3ktpREjztZK78GGQax29iITAvlhDOK6J"
                              />
                            </div>
                            <div className="ml-4">
                              <div
                                className="text-sm font-medium text-primary"
                              >
                                Ethan Harper
                              </div>
                              <div className="text-sm text-secondary">
                                ethan.harper@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          >
                            Active
                          </span>
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          25
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          4.8
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          2 days ago
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                        >
                          <a
                            className="text-link hover:text-blue-700"
                            href="#"
                            >Edit</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                alt=""
                                className="h-10 w-10 rounded-full"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoqrXIHSajSVyoOQI1_DnSGaGUTouVTbWxnbXSu7n_SQEO7o0NBLkB68fKWmnHR_x3oIHUJB3kUiD-TSH3nP0ttgleq_grOiUzVzpEnEMFMI7y601nHfzcZddATT-6FZxEKs0F4XQg2Um6F752IEm2bbEoeszuiWyi8IYeidATWG4uve9Gx6GcPMG60--BIeCJuCIpwBxGYMObWnXVRsUBApwRY0TckqSMJkdkduu0g1rC3ktpREjztZK78GGQax29iITAvlhDOK6J"
                              />
                            </div>
                            <div className="ml-4">
                              <div
                                className="text-sm font-medium text-primary"
                              >
                                Olivia Bennett
                              </div>
                              <div className="text-sm text-secondary">
                                olivia.bennett@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          >
                            Active
                          </span>
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          18
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          4.9
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          1 week ago
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                        >
                          <a
                            className="text-link hover:text-blue-700"
                            href="#"
                            >Edit</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                alt=""
                                className="h-10 w-10 rounded-full"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoqrXIHSajSVyoOQI1_DnSGaGUTouVTbWxnbXSu7n_SQEO7o0NBLkB68fKWmnHR_x3oIHUJB3kUiD-TSH3nP0ttgleq_grOiUzVzpEnEMFMI7y601nHfzcZddATT-6FZxEKs0F4XQg2Um6F752IEm2bbEoeszuiWyi8IYeidATWG4uve9Gx6GcPMG60--BIeCJuCIpwBxGYMObWnXVRsUBApwRY0TckqSMJkdkduu0g1rC3ktpREjztZK78GGQax29iITAvlhDOK6J"
                              />
                            </div>
                            <div className="ml-4">
                              <div
                                className="text-sm font-medium text-primary"
                              >
                                Liam Carter
                              </div>
                              <div className="text-sm text-secondary">
                                liam.carter@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className="inline-flex rounded-full bg-amber-100 px-2 text-xs font-semibold leading-5 text-amber-800"
                          >
                            Inactive
                          </span>
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          12
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          4.5
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          3 weeks ago
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                        >
                          <a
                            className="text-link hover:text-blue-700"
                            href="#"
                            >Edit</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                alt=""
                                className="h-10 w-10 rounded-full"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoqrXIHSajSVyoOQI1_DnSGaGUTouVTbWxnbXSu7n_SQEO7o0NBLkB68fKWmnHR_x3oIHUJB3kUiD-TSH3nP0ttgleq_grOiUzVzpEnEMFMI7y601nHfzcZddATT-6FZxEKs0F4XQg2Um6F752IEm2bbEoeszuiWyi8IYeidATWG4uve9Gx6GcPMG60--BIeCJuCIpwBxGYMObWnXVRsUBApwRY0TckqSMJkdkduu0g1rC3ktpREjztZK78GGQax29iITAvlhDOK6J"
                              />
                            </div>
                            <div className="ml-4">
                              <div
                                className="text-sm font-medium text-primary"
                              >
                                Sophia Davis
                              </div>
                              <div className="text-sm text-secondary">
                                sophia.davis@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          >
                            Active
                          </span>
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          30
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          4.7
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          1 day ago
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                        >
                          <a
                            className="text-link hover:text-blue-700"
                            href="#"
                            >Edit</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                alt=""
                                className="h-10 w-10 rounded-full"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoqrXIHSajSVyoOQI1_DnSGaGUTouVTbWxnbXSu7n_SQEO7o0NBLkB68fKWmnHR_x3oIHUJB3kUiD-TSH3nP0ttgleq_grOiUzVzpEnEMFMI7y601nHfzcZddATT-6FZxEKs0F4XQg2Um6F752IEm2bbEoeszuiWyi8IYeidATWG4uve9Gx6GcPMG60--BIeCJuCIpwBxGYMObWnXVRsUBApwRY0TckqSMJkdkduu0g1rC3ktpREjztZK78GGQax29iITAvlhDOK6J"
                              />
                            </div>
                            <div className="ml-4">
                              <div
                                className="text-sm font-medium text-primary"
                              >
                                Noah Evans
                              </div>
                              <div className="text-sm text-secondary">
                                noah.evans@example.com
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          >
                            Active
                          </span>
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          22
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          4.6
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm text-secondary"
                        >
                          5 days ago
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                        >
                          <a
                            className="text-link hover:text-blue-700"
                            href="#"
                            >Edit</a
                          >
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
    </div>
  )
}
