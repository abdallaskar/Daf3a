import { NavLink } from "react-router";

function NavBar() {
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-[98%] flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
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
            <span className="font-poppins  text-2xl font-bold text-primary dark:text-white">
              Df3a
            </span>
          </NavLink>
          <div className="flex md:order-2  md:ms-0 items-center md:gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <span className="font-poppins text-base font-medium link-primary link-primary:hover cursor-pointer ">
              Log in
            </span>
            <button
              type="button"
              className="flex h-12 min-w-[120px] items-center btn-primary justify-center rounded-lg px-6 text-base  shadow-md btn-primary:hover"
            >
              Sign Up
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="#"
                  className="block py-2 px-3 font-poppins text-base font-medium link-primary link-primary:hover md:p-0 "
                  aria-current="page"
                >
                  Find Mentors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="block py-2 px-3 font-poppins text-base font-medium link-primary link-primary:hover md:p-0"
                >
                  Workshops
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
