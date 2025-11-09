import React, { use } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const Footer = () => {
  const { user } = use(AuthContext);

  return (
    <footer className="bg-linear-to-b from-green-900 to-green-800 text-gray-100 py-10 mt-16">
      <div className="w-11/12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Krishi<span className="text-green-300">Link</span>
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Empowering farmers and traders by connecting the agricultural world
            through one modern digital platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-green-300 duration-200">
                Home
              </a>
            </li>
            <li>
              <a
                href="/all-crops"
                className="hover:text-green-300 duration-200"
              >
                All Crops
              </a>
            </li>

            <li>
              <Link
                to={user ? "/add-crop" : "/register"}
                className="hover:text-green-300 duration-200"
              >
                Add Crop
              </Link>
            </li>
            <li>
              <Link
                to={user ? "/profile" : "/register"}
                className="hover:text-green-300 duration-200"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a
                href="https://themeforest.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-300 duration-200"
              >
                ThemeForest
              </a>
            </li>
            <li>
              <a
                href="https://uiverse.io/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-300 duration-200"
              >
                UIverse
              </a>
            </li>
            <li>
              <a
                href="https://devmeetsdevs.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-300 duration-200"
              >
                Dev Meets Devs
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-300 duration-200 text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-300 duration-200 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-300 duration-200 text-xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-300 duration-200 text-xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-green-700 mt-10"></div>

      {/* Bottom text */}
      <div className="text-center text-gray-400 text-sm mt-6">
        <p>
          © {new Date().getFullYear()} KrishiLink. All rights reserved. | Built
          with ❤️ by <span className="text-green-300">Riyad</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
