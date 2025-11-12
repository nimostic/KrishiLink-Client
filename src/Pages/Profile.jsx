import React, { use, useEffect } from "react";
import pic from "../assets/profileIcon.png";
import { Link } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
import oops from "../assets/oops.png";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import { AuthContext } from "../Provider/AuthContext";

const Profile = () => {
  useEffect(() => {
    Aos.init({
      duration: 700,
      once: true, 
      easing: "ease-in-out",
      offset: 150,
    });
  }, []);

  const { user, updateUser, setUser, loading } = use(AuthContext);
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    let name = form.name.value.trim();
    let photo = form.photoURL.value.trim();

    if (!name && !photo) {
      toast.error("Please enter at least one field to update!");
      return;
    }
    name = name || user.displayName;
    photo = photo || user.photoURL;

    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        form.reset();
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <title>Profile</title>
      {loading ? (
        <Loading />
      ) : (
        <div
          data-aos="fade-up"
          className="min-h-screen bg-green-50 text-gray-900 flex items-center justify-center p-4"
        >
          {user ? (
            <div className="rounded-xl bg-linear-to-r from-green-500 to-green-600 shadow-2xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">
              {/* Left Side */}
              <div className="w-full lg:w-1/3 flex flex-col items-center justify-center p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/20 text-white">
                <img
                  src={user?.photoURL || pic}
                  alt="Profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <h2 className="text-xl sm:text-2xl font-semibold mt-4">
                  {user?.displayName || "Jon Doe"}
                </h2>
              </div>

              {/* Right Side */}
              <div className="w-full lg:w-2/3 p-6 sm:p-8 bg-white text-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <h3 className="col-span-1 sm:col-span-2 text-lg sm:text-xl font-semibold border-b border-green-400 pb-2 text-green-700">
                  Bio & Other Details
                </h3>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium break-all">
                    {user?.email || "example@mail.com"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Photo URL</p>
                  <p className="font-medium break-all">
                    {user?.photoURL || "No photo added"}
                  </p>
                </div>

                <div className="col-span-1 sm:col-span-2 mt-3">
                  <form onSubmit={handleUpdate} className="space-y-3">
                    <label className="block text-gray-600 text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full border border-green-400 rounded p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      placeholder="Updated Name"
                    />

                    <label className="block text-gray-600 text-sm font-medium">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      name="photoURL"
                      className="w-full border border-green-400 rounded p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      placeholder="Please enter a photo URL"
                    />

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img
                src={oops}
                alt="Oops"
                className="w-64 sm:w-80 md:w-96 mb-6"
              />
              <Link
                to="/auth/login"
                className="text-xl font-bold btn bg-green-600 text-white hover:bg-green-700"
              >
                Please login to view details
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;


