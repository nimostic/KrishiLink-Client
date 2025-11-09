import React, { use, useEffect, useState } from "react";
import { Link, Links, useLocation, useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Provider/AuthProvider";
const Login = () => {
  useEffect(() => {
    Aos.init({
      duration: 600,
      once: false,
      easing: "ease-in-sine",
      offset: 200,
    });
  }, []);

  const { signIn, updateUser, googleSignup, setUser } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  // function
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });

    signIn(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        toast(`☑️ Logged in as ${user.displayName}`);
        navigate(`${location.state ? location.state : "/"}`);
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setError(errorCode);
      });
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await googleSignup();
      const user = result.user;
      updateUser({ displayName: user.displayName, photoURL: user.photoURL })
        .then(() => {
          setUser(user);
          toast.success(`☑️ Logged in as ${user.displayName}`);
          navigate(`${location.state ? location.state : "/"}`);
        })
        .catch(error);
    } catch (err) {
      // console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>login</title>
      <div
        data-aos="fade-zoom-in"
        className="flex justify-center items-center w-full h-full"
      >
        <form
          onSubmit={handleLogin}
          className="fieldset bg-base-200 border-2 border-green-600 rounded-box w-xs md:w-md p-4"
        >
          <legend className="fieldset-legend text-green-600 text-3xl">
            Login
          </legend>

          <label className="label text-blue-950 text-sm font-semibold">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            className="input w-full text-gray-400"
            placeholder="Email"
          />

          <label className="label text-blue-950 text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              className="input w-full text-gray-400"
              placeholder="Password"
            />{" "}
            <button
              onClick={handleShowPassword}
              className="absolute top-4 right-4"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className="">
            <Link
              to="/forget-password"
              className="inline text-green-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            onClick={handleGoogleSignUp}
            className="btn bg-white text-black border-[#e5e5e5] mt-4"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          {error && <p className="text-red-500 mt-1">{error}</p>}
          <button className="btn bg-[#267e19] text-white mt-4">Login</button>
          <p>
            Don't have Account?
            <Link to="/register" className="text-green-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;