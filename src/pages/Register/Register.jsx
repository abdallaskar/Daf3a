import { GrGithub, GrGoogle } from "react-icons/gr";
import AuthHeader from "../../components/Auth/AuthHeader";
import { Link } from "react-router";

function Register() {
  return (
    <>
      <div className="grid p-4 lg:p-8  mx-auto w-full max-w-6xl grid-cols-1 lg:grid-cols-2 lg:gap-16">
        <AuthHeader />
        <div className="w-full  font-poppins max-w-md self-center">
          <div className="mb-6 text-center lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-3xl font-bold text-primary"
            >
              <svg
                className="h-8 w-8 text-brand"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Df3a</span>
            </Link>
          </div>

          <div className="rounded-2xl bg-card-background p-8 shadow-xl">
            <h2 className="mb-2 text-center text-3xl font-bold text-primary">
              Create Your Account
            </h2>
            <p className="mb-6 text-center text-sm text-secondary">
              Join via your social account
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-md  px-4 py-3 font-medium btn-secondary">
                <GrGoogle size={24} />
                <span>Google</span>
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md  px-4 py-3 font-medium btn-secondary">
                <GrGithub size={24} />
                <span>GitHub</span>
              </button>
            </div>
            <div className="my-6 flex items-center">
              <div className="flex-grow border-input"></div>
              <span className="mx-4 flex-shrink text-sm text-secondary ">
                Or with email
              </span>
              <div className="flex-grow border-input"></div>
            </div>
            <form className="max-w mx-auto space-y-5">
              <div class="mb-5">
                <input
                  type="name"
                  id="name"
                  class="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your Name"
                />
              </div>
              <div class="mb-5">
                <input
                  type="email"
                  id="email"
                  class="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your Email"
                />
              </div>
              <div>
                <div className="flex">
                  <select
                    class="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3 p-2.5"
                    id="country-code"
                    name="country-code"
                  >
                    <option value="+20">EG +20</option>
                    <option value="+966">SA +966</option>
                    <option value="+971">AE +971</option>
                    <option value="+962">JO +962</option>
                    <option className="" value="+965">
                      KW +965
                    </option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    class="ms-2 bg-input  border-input border text-primary text-sm rounded-md px-4 py-3 block w-full p-2.5  "
                    placeholder="Enter your Phone"
                  />
                </div>
              </div>
              <div class="mb-5">
                <input
                  type="password"
                  id="password"
                  class="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your password"
                />
              </div>
              <div class="mb-5">
                <input
                  type="password"
                  id="rePassword"
                  class="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your password again"
                />
              </div>
              <div className="flex items-center justify-center space-x-4 pt-2">
                <label
                  className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md  border-2 border-input px-4 py-3 text-primary transition-all duration-300 has-[:checked]:border-primary has-[:checked]:bg-teal-50 has-[:checked]:ring-2 has-[:checked]:text-primary"
                  htmlFor="student"
                >
                  <input
                    className="form-radio h-5 w-5 border-gray-400 text-primary focus:ring-text-primary"
                    id="student"
                    name="role"
                    type="radio"
                    value="student"
                  />
                  <span className="font-medium">Student</span>
                </label>
                <label
                  className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md  border-2 border-input px-4 py-3 text-primary transition-all duration-300 has-[:checked]:border-primary has-[:checked]:bg-teal-50 has-[:checked]:ring-2 has-[:checked]:text-primary"
                  htmlFor="mentor"
                >
                  <input
                    className="form-radio h-5 w-5 border-gray-400 text-primary focus:ring-text-primary"
                    id="mentor"
                    name="role"
                    type="radio"
                    value="mentor"
                  />
                  <span className="font-medium">Mentor</span>
                </label>
              </div>
              <button
                className="btn-primary w-full rounded-md px-4 py-3 "
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-6">
              <p className="text-sm text-secondary">Already have an account?</p>
              <Link className="link-primary underline" to={"/login"}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
