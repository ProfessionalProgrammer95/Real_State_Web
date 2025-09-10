import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer
      className="mt-16 text-white"
      style={{ backgroundColor: "var(--clr-footer, #1E3A8ACC)" }}
    >
      <div className="mx-auto w-[100%] max-w-[100%] px-4 py-10 sm:py-12">
        {/* Top: headline + sub + email pill */}
        <div className="text-center">
          <h2 className="text-[50px]  text-700 tracking-[0.02em] font-extrabold">
            Get in Touch with Us
          </h2>
          <p className="mt-3 text-[32px] tracking-[0.02em] text-white-100 leading-[43px]  opacity-70">
            Subscribe now for exclusive <br />
            property insights and deals!
          </p>

          {/* Email input pill */}
          <form
            className="mt-6  m-auto flex items-center justify-center "
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex items-center bg-[var(--clr-image-border)] rounded-full h-[65px] sm:h-[65px] footer-btn pl-5 pr-2 w-[90%] max-w-[602px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-[24px] text-[#333] outline-none placeholder:text-[#6B7280]"
              />
              <button
                type="submit"
                className="ml-2 w-[148px] h-[48px] rounded-full px-5 py-2 text-sm font-semibold"
                style={{ backgroundColor: "var(--clr-primary, #1F3A93)" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Divider-ish spacing */}
        <div className="mt-36" />

        {/* Bottom row */}
        <div className="flex flex-row max-w-[100%] gap-6 sm:gap-6 sm:items-center sm:justify-between footer-navbar">
          {/* Brand (left) */}
          <div className="inline-flex relative items-center mx-8 gap-2">
            <span className="grid place-items-center  rounded-md bg-white/15">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.4931 29.8952H25.7466V32H17.4087V17.2662H11.1552V32H2.8173V14.5529L1.46565 15.9013L0 14.4214L14.2819 0L28.5639 14.4214L27.0982 15.9013L25.7466 14.5529V17.2662H23.6621V12.4481L14.2819 2.95992L4.90178 12.4481V29.8952H9.07074V15.1614H19.4931V29.8952ZM32 19.371V32H29.9155V27.7903H21.5776V19.371H32ZM29.9155 21.4758H23.6621V25.6855H29.9155V21.4758Z" fill="#D9D9D9"/>
            </svg>
              {/* <Icon icon="solar:home-2-bold" className="w-5 h-5" /> */}
            </span>
            <span className="text-[18px] font-semibold">PropBot</span>
          </div>

          {/* Middle links */}
          <nav className="flex flex-wrap items-center tracking-[0.02em] leading-[43px]  justify-center absolute left-[35%] gap-x-6 gap-y-2 opacity-95  text-[16px]">
            <a href="/buy" className="hover:underline">
              For Sale
            </a>
            <a href="#" className="hover:underline">
              Rentals
            </a>
            <a href="#" className="hover:underline">
              New Projects
            </a>
            <a href="#" className="hover:underline">
              Property News
            </a>
          </nav>

          {/* Copyright (right) */}
          <div className="text-[20px] opacity-90 text-center sm:text-center">
            <span className=" tracking-[0.02em] leading-[43px] inline-flex items-center gap-2 text-center">
              <Icon icon="mdi:at" className="w-4 h-4" />
              2025 Propbot. All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
