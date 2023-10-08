import { Link } from "@remix-run/react";
import React from "react";
import { useLove } from "~/lib/useCart";

const NavBar = () => {
  const toggleCart = useLove((state) => state.toggleCart);
  const totalItems = useLove((state) => state.totalItems);

  return (
    <div>
      <header className="relative z-10 ">
        <div className="bg-gray-900 text-white">
          <div className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
                <div className="flex items-center">
                  <Link to="/">
                    <h1 className="text-3xl font-semibold">
                      Dark<span className="text-purple-300">Violet</span>.ai{" "}
                      <span className="text-cyan-300">Bazaar</span>
                    </h1>
                  </Link>
                </div>
                <button
                  className="group -m-2 p-2 flex items-center"
                  onClick={toggleCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>

                  <span className="ml-2 text-sm font-medium  text-gray-900 bg-purple-200 px-3 py-1 rounded-full border border-cyan-300">
                    {totalItems}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
      </header>
    </div>
  );
};

export default NavBar;
