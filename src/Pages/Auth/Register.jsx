import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Provider/AuthContext";
const Register = () => {
  useEffect(() => {
    Aos.init({
      duration: 600,
      once: false,
      easing: "ease-in-sine",
      offset: 200,
    });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { setUser, createUser, googleSignup, updateUser } = use(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    setError("");
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photoURL.value;
    // console.log({ name, email, password, photo });
    // password validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter.");
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast("☑️ Sign Up Successful...");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to update profile!");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await googleSignup();
      const user = result.user;
      updateUser({ displayName: user.displayName, photoURL: user.photoURL })
        .then(() => {
          setUser(user);
          toast.success("☑️ Google Sign-In Successful!");
          navigate("/");
        })
        .catch(console.log);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>Register</title>
      <div
        data-aos="fade-zoom-in"
        className="flex justify-center items-center w-full h-full"
      >
        <form
          onSubmit={handleRegister}
          className="fieldset bg-base-200 border-2 border-green-600 rounded-box w-xs md:w-md p-4"
        >
          <legend className="fieldset-legend text-green-600 text-3xl">
            Register
          </legend>

          <label className="label text-blue-950 text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            required
            name="name"
            className="input text-gray-400 w-full"
            placeholder="Name"
          />
          <label className="label text-blue-950 text-sm font-semibold">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            className="input text-gray-400 w-full"
            placeholder="Email"
          />
          <label className="label text-blue-950 text-sm font-semibold">
            Photo URL
          </label>
          <input
            required
            type="text"
            name="photoURL"
            className="input text-gray-400 w-full"
            placeholder="photoURL"
          />

          <label className="label text-blue-950 text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              required
              name="password"
              type={showPassword ? "text" : "password"}
              className="input w-full text-gray-400"
              placeholder="Password"
            />{" "}
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute top-4 right-4"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleGoogleSignUp}
            type="button"
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
            Register with Google
          </button>

          <button className="btn bg-[#267E19] text-white mt-4">Register</button>
          <p>
            Already have Account?{" "}
            <Link to="/login" className="text-green-500">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;