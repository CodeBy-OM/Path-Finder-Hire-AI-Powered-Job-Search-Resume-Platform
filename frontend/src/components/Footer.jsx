import {
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <div className="text-sm text-gray-500">
          <span className="font-semibold text-blue-600">PathFinderHire</span> © {new Date().getFullYear()} All rights reserved.
        </div>

        {/* CENTER - SOCIAL ICONS */}
        <div className="flex items-center gap-5 text-gray-500 text-lg">
          <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaYoutube className="hover:text-red-600 cursor-pointer" />
          <FaFacebook className="hover:text-blue-700 cursor-pointer" />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer">Terms</span>
          <span className="hover:text-blue-600 cursor-pointer">Privacy</span>
          <span className="hover:text-blue-600 cursor-pointer">
            Cancellation-Refund
          </span>
          <span className="hover:text-blue-600 cursor-pointer">Support</span>

          <button className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full text-sm">
            Join Community
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
