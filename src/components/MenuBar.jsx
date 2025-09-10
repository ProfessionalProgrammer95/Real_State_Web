import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

function MenuBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkBase =
    "relative pb-1 text-[15px] transition-colors";
  const underline =
    "after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] " +
    "after:bg-[var(--clr-primary)] after:rounded-full " +
    "after:transition-all after:duration-300 after:w-0 hover:after:w-full";

  const linkClass = ({ isActive }) =>
    [
      linkBase,
      underline,
      isActive ? "text-[var(--clr-primary)] after:w-full" : "text-[var(--clr-text)]",
    ].join(" ");

  return (
    <header className="bg-white mb-5">
      <div className="max-w-full mb-5 px-4 sm:px-6 border-b shadow-md">
        <div className="h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.4931 29.8952H25.7466V32H17.4087V17.2662H11.1552V32H2.8173V14.5529L1.46565 15.9013L0 14.4214L14.2819 0L28.5639 14.4214L27.0982 15.9013L25.7466 14.5529V17.2662H23.6621V12.4481L14.2819 2.95992L4.90178 12.4481V29.8952H9.07074V15.1614H19.4931V29.8952ZM32 19.371V32H29.9155V27.7903H21.5776V19.371H32ZM29.9155 21.4758H23.6621V25.6855H29.9155V21.4758Z" fill="#1E1E1E"/>
            </svg>
            <span className="text-[20px] font-extrabold">PropBot</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/buy" className={linkClass}>Buy</NavLink>
            <NavLink to="/rent" className={linkClass}>Rent</NavLink>
            <NavLink to="/sell" className={linkClass}>Sell</NavLink>
            <NavLink to="/about" className={linkClass}>About Us</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/login"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-white text-sm hover:opacity-95"
            style={{ backgroundColor: "var(--clr-primary)" }}
          >
            Login / Register
            <Icon icon="ei:arrow-down" className="text-base w-[25px] h-[25px] rotate-[270deg]" />
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border"
            style={{ borderColor: "var(--clr-border)" }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen ? "true" : "false"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Icon
              icon={mobileOpen ? "mdi:close" : "mdi:menu"}
              className="w-6 h-6 text-[var(--clr-text)]"
            />
          </button>
        </div>
      </div>

      <div className="h-[1px] bg-gray-100"></div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 z-50 text-center ${
          mobileOpen ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <nav className="px-4 sm:px-6 py-3 border-b" style={{ borderColor: "var(--clr-border)" }}>
          <ul className="flex flex-col gap-3">
            <li><NavLink to="/" end className={linkClass} onClick={() => setMobileOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/buy" className={linkClass} onClick={() => setMobileOpen(false)}>Buy</NavLink></li>
            <li><NavLink to="/rent" className={linkClass} onClick={() => setMobileOpen(false)}>Rent</NavLink></li>
            <li><NavLink to="/sell" className={linkClass} onClick={() => setMobileOpen(false)}>Sell</NavLink></li>
            <li><NavLink to="/about" className={linkClass} onClick={() => setMobileOpen(false)}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={linkClass} onClick={() => setMobileOpen(false)}>Contact Us</NavLink></li>

            {/* Mobile CTA */}
            <li className="pt-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-white text-sm hover:opacity-95"
                style={{ backgroundColor: "var(--clr-primary)" }}
              >
                Login / Register
                <Icon icon="ei:arrow-down" className="text-base w-[25px] h-[25px] rotate-[270deg]" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MenuBar;
