import React from "react";

const Footer = () => {
  return (
    <footer className="mb-0 text-center bg-white py-6 border-t mt-10">
      <div className="flex flex-col items-center justify-center pb-5">
        <div className="w-full md:w-1/2">
          <p className="mb-3 md:mb-0 text-gray-700">
            Made with <span role="img" aria-label="love">❤️</span> by {" "}
            <a
              href=""
              className="underline text-black text-lg hover:text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              Mohamed Elsayed
            </a>
          </p>
          <a
            className="text-black text-2xl hover:text-gray-700 ml-2"
            href="https://github.com/ssahibsingh"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <i className="fa fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 