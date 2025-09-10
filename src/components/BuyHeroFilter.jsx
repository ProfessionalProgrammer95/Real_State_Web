import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function BuyHeroFilter({ onResults }) {
  // ---------- Data state ----------
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // ---------- UI state ----------
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [selectedPurpose, setSelectedPurpose] = useState("For Sale"); // Buy page defaults to For Sale
  const [selectedPropertyType, setSelectedPropertyType] = useState("House");
  const [selectedCountry, setSelectedCountry] = useState("Indonesia");

  // ---------- Fetch ----------
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
        );
        const data = await response.json();
        setAllProperties(Array.isArray(data) ? data : []);
        const uniqueCountries = Array.from(
          new Set((data || []).map((d) => d.country).filter(Boolean))
        );
        if (uniqueCountries.length && !uniqueCountries.includes(selectedCountry)) {
          setSelectedCountry(uniqueCountries[0]);
        }
      } catch {
        setLoadError("Failed to load properties.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ---------- Helpers ----------
  const availableCountries = useMemo(() => {
    const set = new Set();
    allProperties.forEach((p) => p.country && set.add(p.country));
    return Array.from(set);
  }, [allProperties]);

  // Derive purpose/type from id to simulate API fields
  const derivedPurpose = (prop) => (Number(prop.id) % 2 === 0 ? "For Rent" : "For Sale");
  const derivedType = (prop) => {
    const mod = Number(prop.id) % 3;
    return mod === 0 ? "House" : mod === 1 ? "Apartment" : "Villa";
  };

  // Final filtered list (location filter via country)
  const filteredResults = useMemo(() => {
    return allProperties.filter((prop) => {
      if (selectedPurpose && derivedPurpose(prop) !== selectedPurpose) return false;
      if (selectedPropertyType && derivedType(prop) !== selectedPropertyType) return false;
      if (selectedCountry && prop.country !== selectedCountry) return false;
      return true;
    });
  }, [allProperties, selectedPurpose, selectedPropertyType, selectedCountry]);

  function handleFindClick() {
    onResults?.(filteredResults);
  }

  // ---------- Reusable UI: click outside ----------
  function useClickOutside(onOutsideClick) {
    const containerRef = useRef(null);
    useEffect(() => {
      function handleDocMouseDown(event) {
        if (!containerRef.current) return;
        const clickedInside = containerRef.current.contains(event.target);
        if (!clickedInside) onOutsideClick?.();
      }
      document.addEventListener("mousedown", handleDocMouseDown);
      return () => document.removeEventListener("mousedown", handleDocMouseDown);
    }, [onOutsideClick]);
    return containerRef;
  }

  // ---------- Custom Select (same behavior as Home) ----------
  function CustomSelect({ value, onChange, options = [], placeholder = "Select…", className = "" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuFilterText, setMenuFilterText] = useState("");
    const rootRef = useClickOutside(() => setIsMenuOpen(false));

    const filteredOptions = useMemo(() => {
      const normalized = menuFilterText.trim().toLowerCase();
      if (!normalized) return options;
      return options.filter((opt) => String(opt).toLowerCase().includes(normalized));
    }, [options, menuFilterText]);

    return (
      <div ref={rootRef} className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="w-full h-[48px] px-4 text-left bg-transparent outline-none text-sm
                     flex items-center justify-between"
          style={{ borderColor: "var(--clr-gray)" }}
        >
          <span className="truncate">{value || placeholder}</span>
          <Icon
            icon={isMenuOpen ? "grommet-icons:up" : "grommet-icons:down"}
            className="w-5 h-5 text-gray-500"
          />
        </button>

        {isMenuOpen && (
          <div
            className="absolute z-[60] mt-2 w-full rounded-xl border bg-white
                       shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
            style={{ borderColor: "var(--clr-gray)" }}
          >
            <div className="px-3 pt-3">
              <input
                autoFocus
                value={menuFilterText}
                onChange={(e) => setMenuFilterText(e.target.value)}
                placeholder="Search…"
                className="w-full h-[38px] rounded-lg border px-3 text-sm outline-none"
                style={{ borderColor: "var(--clr-border)" }}
              />
            </div>
            <ul className="max-h-60 overflow-auto py-2">
              {filteredOptions.length ? (
                filteredOptions.map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt);
                        setIsMenuOpen(false);
                        setMenuFilterText("");
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      {opt}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-gray-500">No results</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="max-w-full mb-12 px-5 sm:px-6">
      {/* HERO */}
      <div className="relative mx-auto mt-6 w-[95%] hero-section h-[527px] rounded-[28px] overflow-hidden shadow-[0_10px_36px_rgba(0,0,0,0.14)]">
        <img
          src="/assets/buyherosection-image.png"
          alt="Hero"
          className="w-full h-full object-cover"
        />

        {/* Overlay heading exactly like your snippet */}
        <div className="absolute mb-4 inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-[48px] font-extrabold text-center drop-shadow">
            Featured Properties For Sale
          </h1>
          <p className="mt-2 text-center text-[20px] opacity-90 text-[var(--clr-card-gray)] drop-shadow">
            Discover, Buy, or Rent Verified Properties with Ease.
          </p>

          {/* Mobile toggle button for filter bar (below heading) */}
          <div className="mt-4 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen((v) => !v)}
              className="rounded-full px-4 py-2 text-sm font-medium bg-white/90 text-[var(--clr-text)]
                         shadow border"
              style={{ borderColor: "var(--clr-border)" }}
            >
              {isMobileFiltersOpen ? "Hide Filters" : "Filters"}
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BAR (alignment kept; now with custom selects and mobile collapse) */}
      <div className="relative py-4 -mt-16 flex justify-center">
        <div
          className={`w-full max-w-[80%] rounded-full bg-white shadow-[0_18px_36px_rgba(0,0,0,0.08)]
                      px-12 md:px-12 py-12 md:py-8 flex flex-wrap items-center gap-3 justify-between
                      hf-collapsible ${isMobileFiltersOpen ? "open" : ""}`}
        >
          {/* Purpose */}
          <div
            className="flex items-center gap-2 rounded-full border-[1px] px-4 h-[48px]
                       basis-[23%] min-w-[220px]"
            style={{ borderColor: "var(--clr-gray)" }}
          >
            <Icon
              icon="icon-park:efferent-three"
              className="fill-[var(--clr-locationtxt)] text-base w-[20px] h-[20px]"
            />
            <CustomSelect
              value={selectedPurpose}
              onChange={setSelectedPurpose}
              options={["For Sale", "For Rent"]}
              className="w-full"
            />
          </div>

          {/* Type */}
          <div
            className="flex items-center gap-2 rounded-full border-[1px] px-4 h-[48px]
                       basis-[23%] min-w-[220px]"
            style={{ borderColor: "var(--clr-gray)" }}
          >
            <Icon
              icon="clarity:house-line"
              className="fill-[var(--clr-locationtxt)] text-base w-[20px] h-[20px]"
            />
            <CustomSelect
              value={selectedPropertyType}
              onChange={setSelectedPropertyType}
              options={["House", "Apartment", "Villa"]}
              className="w-full"
            />
          </div>

          {/* Country */}
          <div
            className="flex items-center gap-2 rounded-full border-[1px] px-4 h-[48px]
                       basis-[23%] min-w-[220px]"
            style={{ borderColor: "var(--clr-gray)" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: "var(--clr-gray)" }}>
              my_location
            </span>
            <CustomSelect
              value={selectedCountry}
              onChange={setSelectedCountry}
              options={availableCountries}
              className="w-full"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleFindClick}
            className="h-[48px] px-6 rounded-full text-white text-sm font-semibold shadow shrink-0 basis-[23%] min-w-[200px] max-w-[220px]"
            style={{ backgroundColor: "var(--clr-primary)" }}
          >
            Find Property 
          </button>
        </div>
      </div>

      <div className="sr-only">
        {isLoading ? "Loading..." : ""}
        {loadError ? loadError : ""}
      </div>
    </section>
  );
}

