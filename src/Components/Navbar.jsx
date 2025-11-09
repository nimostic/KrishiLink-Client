import logo from "../assets/logo.png"

import { NavLink } from "react-router";

const Navbar = () => {
  const navbarLinks = (
    <>
      <li>
        <NavLink
          to="/home"
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
          to="/add-crops"
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
              isActive ? "text-[#48e02a] font-semibold" : "text-black hover:text-[#48e02a]"
            }
          >
           My Posts
          </NavLink>
        </li>
         <li>
          <NavLink
            to="/my-interests"
            className={({ isActive }) =>
              isActive ? "text-[#48e02a] font-semibold" : "text-black hover:text-[#48e02a]"
            }
          >
            My Interests
          </NavLink>
        </li>

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
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
      <div className="navbar-end">
        <a className="btn bg-[#2D6A50] text-white">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
