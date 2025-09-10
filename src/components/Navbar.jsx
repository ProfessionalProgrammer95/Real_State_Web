// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b shadow-md bg-white">
      {/* Left: Back (icon-only on small screens) */}
      <Link
        to="/"
        aria-label="Back to Homepage"
        className="
          inline-flex items-center rounded-full border hover:bg-gray-50
          px-2 py-2 gap-0
          md:px-4 md:py-2 md:gap-2
          text-sm
        "
        style={{ borderColor: "var(--clr-border)" }}
      >
        <Icon icon="ei:arrow-down" className="w-[25px] h-[25px] rotate-90"></Icon>

        <span className="hidden md:inline">Back to Homepage</span>
      </Link>

      {/* Center: Logo */}
      <div className="flex items-center gap-2 font-semibold">
        <div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4931 29.8952H25.7466V32H17.4087V17.2662H11.1552V32H2.8173V14.5529L1.46565 15.9013L0 14.4214L14.2819 0L28.5639 14.4214L27.0982 15.9013L25.7466 14.5529V17.2662H23.6621V12.4481L14.2819 2.95992L4.90178 12.4481V29.8952H9.07074V15.1614H19.4931V29.8952ZM32 19.371V32H29.9155V27.7903H21.5776V19.371H32ZM29.9155 21.4758H23.6621V25.6855H29.9155V21.4758Z" fill="#1E1E1E"/>
</svg>

        </div>
        <span className="text-[24px] sm:text-[22px] font-extrabold">PropBot</span>
      </div>

      {/* Right: About (icon-only on small screens) */}
      <Link
        to="/about"
        aria-label="About Us"
        className="
          inline-flex items-center rounded-full border 
          px-2 py-2 gap-0
          md:px-4 md:py-2 md:gap-2
          text-sm
        "
        style={{ backgroundColor: "var(--clr-primary)" }}
      >
        <span className="hidden md:inline">About Us</span>
        <Icon icon="ei:arrow-down" className="w-[25px] h-[25px] rotate-[270deg] text-white"></Icon>

      </Link>
    </div>
  );
}
