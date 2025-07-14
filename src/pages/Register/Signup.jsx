import { GrGithub, GrGoogle } from "react-icons/gr";
import AuthHeader from "../../components/Auth/AuthHeader";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/Schema";
import { signUp } from "../../services/authService";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    console.log(data);
    const userdata = {
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: `${data.countryCode}${data.phoneNumber}`,
      role: data.role,
    };
    try {
      const response = await signUp(userdata);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      setError("root", {
        message:
          error.response?.data?.message ||
          "An error occurred during registration.",
      });
    }
  };
  return (
    <>
      <div className="grid p-4 lg:p-8  mx-auto w-full  grid-cols-1 lg:grid-cols-2 lg:gap-16 bg-background">
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

          <div className="rounded-2xl bg-surface p-8 shadow-xl">
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w mx-auto space-y-5"
            >
              <p className="text-center text-red-500 text-sm">
                {errors.root?.message}
              </p>
              <div className="mb-5">
                <input
                  type="name"
                  {...register("name")}
                  id="name"
                  className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your Name"
                />
                <p className="mt-2 text-center text-red-500 text-sm">
                  {errors.name?.message}
                </p>
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your Email"
                />
                <p className="mt-2 text-center text-red-500 text-sm">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <div className="flex">
                  <select
                    className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3 p-2.5"
                    id="country-code"
                    {...register("countryCode")}
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
                    {...register("phoneNumber")}
                    className="ms-2 bg-input  border-input border text-primary text-sm rounded-md px-4 py-3 block w-full p-2.5  "
                    placeholder="Enter your Phone"
                  />
                </div>
                <p className="mt-2 text-center text-red-500 text-sm">
                  {errors.phone?.message}
                </p>
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your password"
                />
                <p className="mt-2 text-center text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  id="rePassword"
                  {...register("confirmPassword")}
                  className="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your password again"
                />
                <p className="mt-2 text-center text-red-500 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4 pt-2">
                <label
                  className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md  border-2 border-input px-4 py-3 text-primary transition-all duration-300 has-[:checked]:border-primary has-[:checked]:bg-surface has-[:checked]:ring-2 has-[:checked]:text-primary"
                  htmlFor="student"
                >
                  <input
                    className="form-radio h-5 w-5 border-gray-400 text-primary focus:ring-text-primary"
                    id="student"
                    {...register("role")}
                    type="radio"
                    value="student"
                    defaultChecked
                  />
                  <span className="font-medium">Student</span>
                </label>
                <label
                  className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md  border-2 border-input px-4 py-3 text-primary transition-all duration-300 has-[:checked]:border-primary has-[:checked]:bg-surface has-[:checked]:ring-2 has-[:checked]:text-primary"
                  htmlFor="mentor"
                >
                  <input
                    className="form-radio h-5 w-5 border-gray-400 text-primary focus:ring-text-primary"
                    id="mentor"
                    {...register("role")}
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

export default Signup;
