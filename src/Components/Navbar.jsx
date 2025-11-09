import { use } from "react";
import logo from "../assets/logo.png";
import profilePic from "../assets/profileIcon.png"
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  console.log(user);
  const handleLogout = () => {
    logout()
      .then(() => {
        // Sign-out successful.
        toast("LogOut successful.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navbarLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#48e02a] font-semibold"
              : "text-black hover:text-[#48e02a]"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-crops"
          className={({ isActive }) =>
            isActive
              ? "text-[#48e02a] font-semibold"
              : "text-black hover:text-[#48e02a]"
          }
        >
          All-Crops
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#48e02a] font-semibold"
                  : "text-black hover:text-[#48e02a]"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-[#48e02a] font-semibold"
                  : "text-black hover:text-[#48e02a]"
              }
            >
              Register
            </NavLink>
          </li>
        </>
      )}

      {user && (
        <>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-[#48e02a] font-semibold"
                  : "text-black hover:text-[#48e02a]"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-crop"
              className={({ isActive }) =>
                isActive
                  ? "text-[#48e02a] font-semibold"
                  : "text-black hover:text-[#48e02a]"
              }
            >
              Add-Crops
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-posts"
              className={({ isActive }) =>
                isActive
                  ? "text-[#48e02a] font-semibold"
                  : "text-black hover:text-[#48e02a]"
              }
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-interests"
              className={({ isActive }) =>
                isActive
                  ? "text-[#48e02a] font-semibold"
                  : "text-black hover:text-[#48e02a]"
              }
            >
              My Interests
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navbarLinks}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <img src={logo} alt="" className="h-12 w-12 " />
          <a className="font-semibold text-xl">KrishiLink</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbarLinks}</ul>
      </div>



      <div className="navbar-end flex items-center gap-3">
        <Link to = {user ? "/profile" : "/login"}>
          <img
            title={user ? user.displayName : "no user"}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
            // src={`${user ? user.photoURL : profilePic}`}
            src={user?.photoURL || profilePic}
            alt="User"
          />
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="btn sm:btn-sm md:btn-md lg:btn-lg bg-[#2D6A50] text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn sm:btn-sm md:btn-md lg:btn-lg bg-[#2D6A50] text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
