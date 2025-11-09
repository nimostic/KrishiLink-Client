import React, { use } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const ForgetPassword = () => {
  const { updatePassword } = use(AuthContext);
  const handleResetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // console.log(email);
    updatePassword(email)
      .then(() => {
        toast("Password reset email sent!")
        window.open("https://mail.google.com", "_blank");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        toast.error(errorMessage)
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-md border border-green-200">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="flex flex-col space-y-4"
        >
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered input-success w-full"
            placeholder="example@mail.com"
            required
          />

          <button className="btn bg-[#267E19] text-white w-full mt-2">
            Request Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?
            <Link
              to="/login"
              className="text-green-600 hover:text-green-800 font-semibold transition-colors"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;