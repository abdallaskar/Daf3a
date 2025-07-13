import { GrGithub, GrGoogle } from "react-icons/gr";
import AuthHeader from "../../components/Auth/AuthHeader";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../utils/Schema";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    console.log(data);

    //api call to register user
  };
  return (
    <>
      <div className="grid p-4 lg:p-8 mt-10 mx-auto w-full max-w-6xl grid-cols-1 lg:grid-cols-2 lg:gap-16">
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
              Welcome Back!
            </h2>
            <p className="mb-6 text-center text-sm text-secondary">
              Sign in to continue to Df3a.
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
              <div class="mb-5">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  class="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your Email"
                />
                <p class="mt-2 text-center text-red-500 text-sm">
                  {errors.email?.message}
                </p>
              </div>
              <div class="mb-5">
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  class="bg-input  border-input border text-primary text-sm rounded-md px-4 py-3  block w-full p-2.5  "
                  placeholder="Enter your password"
                />
                <p class="mt-2 text-center text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    class="h-4 w-4  checkbox"
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  />
                  <label
                    class="ml-2 block checkbox_label text-primary"
                    for="remember-me"
                  >
                    Keep me signed in
                  </label>
                </div>
                <div class="text-sm">
                  <Link
                    class="font-medium link-primary link-primary:hover underline"
                    to={"/forgotPassword"}
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <button
                className="btn-primary w-full rounded-md px-4 py-3 "
                type="submit"
              >
                Sign In
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-6">
              <p className="text-sm text-secondary">Don't have an account?</p>
              <Link className="link-primary underline" to={"/register"}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
