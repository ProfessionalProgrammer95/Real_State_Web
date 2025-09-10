import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";

function HeroFilter({ onResults }) {
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // NEW: mobile toggles (no impact on desktop)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("For Rent"); // derived from id
  const [selectedPropertyType, setSelectedPropertyType] = useState("House"); // derived from id
  const [selectedCountry, setSelectedCountry] = useState("Indonesia");

  // Fetch once
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
        );
        const data = await response.json();
        setAllProperties(Array.isArray(data) ? data : []);
        // set default country if current isn't present
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

  // Build countries list from API
  const availableCountries = useMemo(() => {
    const set = new Set();
    allProperties.forEach((p) => p.country && set.add(p.country));
    return Array.from(set);
  }, [allProperties]);

  // Derive purpose & type from id (because API lacks these fields)
  const derivedPurpose = (prop) =>
    Number(prop.id) % 2 === 0 ? "For Rent" : "For Sale";

  const derivedType = (prop) => {
    const mod = Number(prop.id) % 3;
    return mod === 0 ? "House" : mod === 1 ? "Apartment" : "Villa";
  };

  // Apply filters
  const filteredResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return allProperties.filter((prop) => {
      if (selectedPurpose && derivedPurpose(prop) !== selectedPurpose) return false;
      if (selectedPropertyType && derivedType(prop) !== selectedPropertyType) return false;
      if (selectedCountry && prop.country !== selectedCountry) return false;

      if (normalizedQuery) {
        const haystack = `${prop.name || ""} ${prop.city || ""} ${prop.state || ""} ${
          prop.country || ""
        }`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }
      return true;
    });
  }, [allProperties, searchQuery, selectedPurpose, selectedPropertyType, selectedCountry]);

  function handleFindClick() {
    onResults?.(filteredResults);
  }

  /* -------- helpers you already had (kept as-is) -------- */
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

  function CustomSelect({ value, onChange, options = [], placeholder = "Select…", className = "" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuFilterText, setMenuFilterText] = useState("");
    const rootRef = useClickOutside(() => setIsMenuOpen(false));

    const filteredOptions = useMemo(() => {
      const normalizedFilter = menuFilterText.trim().toLowerCase();
      if (!normalizedFilter) return options;
      return options.filter((optionLabel) => String(optionLabel).toLowerCase().includes(normalizedFilter));
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
          <Icon icon={isMenuOpen ? "grommet-icons:up" : "grommet-icons:down"} className="w-5 h-5 text-gray-500" />
        </button>

        {isMenuOpen && (
          <div
            className="absolute z-[60] mt-2 w-full rounded-xl border bg-white shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
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
                filteredOptions.map((optionLabel) => (
                  <li key={optionLabel}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(optionLabel);
                        setIsMenuOpen(false);
                        setMenuFilterText("");
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      {optionLabel}
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

  function SearchSuggestions({ open, items, onPick }) {
    if (!open || !items.length) return null;
    return (
      <div
        className="absolute z-[70] left-0 right-0 top-[46px] rounded-xl bg-white
                   shadow-[0_10px_30px_rgba(0,0,0,0.12)] border"
        style={{ borderColor: "var(--clr-border)" }}
      >
        <ul className="max-h-64 overflow-auto py-1">
          {items.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => onPick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function SearchBoxWithSuggestions({ searchQuery, setSearchQuery, allProperties }) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const uniqueCitiesAndStates = useMemo(() => {
      const uniqueSet = new Set();
      (allProperties || []).forEach((prop) => {
        if (prop.city) uniqueSet.add(prop.city);
        if (prop.state) uniqueSet.add(prop.state);
      });
      return Array.from(uniqueSet).sort();
    }, [allProperties]);

    const matchingSuggestions = useMemo(() => {
      const normalized = searchQuery.trim().toLowerCase();
      if (!normalized) return [];
      return uniqueCitiesAndStates.filter((label) => label.toLowerCase().includes(normalized)).slice(0, 8);
    }, [uniqueCitiesAndStates, searchQuery]);

    return (
      <div className="relative flex-1 max-w-[600px]">
        <div className="h-[56px] bg-white rounded-xl shadow-lg px-3 flex items-center">
          <Icon
            icon="mingcute:location-2-line"
            className="text-gray-400 mr-2 w-[34px] h-[34px] text-[var(--clr-locationtxt)]"
          />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(!!searchQuery)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
            placeholder="Search Location…"
            className="flex-1 outline-none text-sm text-[--clr-text1] placeholder:text-gray-400"
          />
        </div>

        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
          {/* your custom search svg (kept) */}
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4798 0C7.70038 0 5.0348 1.10412 3.06946 3.06946C1.10412 5.0348 0 7.70038 0 10.4798C0 13.2592 1.10412 15.9248 3.06946 17.8901C5.0348 19.8555 7.70038 20.9596 10.4798 20.9596C13.2592 20.9596 15.9248 19.8555 17.8901 17.8901C19.8555 15.9248 20.9596 13.2592 20.9596 10.4798C20.9596 7.70038 19.8555 5.0348 17.8901 3.06946C15.9248 1.10412 13.2592 0 10.4798 0ZM1.39896 10.4791C1.38394 9.27693 1.60775 8.08377 2.05741 6.96878C2.50706 5.85379 3.17361 4.83917 4.0184 3.98376C4.86319 3.12836 5.86941 2.44919 6.97869 1.98564C8.08798 1.5221 9.27826 1.2834 10.4805 1.2834C11.6827 1.2834 12.873 1.5221 13.9823 1.98564C15.0916 2.44919 16.0978 3.12836 16.9426 3.98376C17.7874 4.83917 18.4539 5.85379 18.9036 6.96878C19.3532 8.08377 19.5771 9.27693 19.562 10.4791C19.562 12.8878 18.6052 15.198 16.9019 16.9012C15.1987 18.6045 12.8886 19.5613 10.4798 19.5613C8.07103 19.5613 5.76092 18.6045 4.05767 16.9012C2.35442 15.198 1.39896 12.8878 1.39896 10.4791Z" fill="#979797"/>
            <path d="M19.6046 18.122C19.5084 18.0196 19.3927 17.9376 19.2642 17.8808C19.1358 17.824 18.9972 17.7936 18.8568 17.7914C18.7164 17.7891 18.577 17.8152 18.4468 17.8679C18.3166 17.9206 18.1984 17.999 18.099 18.0983C17.9997 18.1976 17.9214 18.3158 17.8687 18.446C17.8159 18.5762 17.7899 18.7156 17.7921 18.856C17.7943 18.9965 17.8247 19.135 17.8815 19.2635C17.9383 19.3919 18.0203 19.5077 18.1227 19.6038L23.7115 25.1925C23.8076 25.2949 23.9233 25.377 24.0518 25.4337C24.1802 25.4905 24.3188 25.5209 24.4592 25.5232C24.5997 25.5254 24.7391 25.4993 24.8693 25.4466C24.9994 25.3939 25.1177 25.3155 25.217 25.2162C25.3163 25.1169 25.3947 24.9987 25.4474 24.8685C25.5001 24.7383 25.5261 24.5989 25.5239 24.4585C25.5217 24.318 25.4913 24.1795 25.4345 24.051C25.3777 23.9226 25.2957 23.8068 25.1933 23.7107L19.6046 18.122ZM29.0707 15.2745L25.6721 11.152C25.2528 10.6434 25.6523 9.91663 26.3521 9.91663H33.1493C33.8491 9.91663 34.2486 10.6434 33.8293 11.1534L30.4293 15.2745C30.3446 15.3713 30.2402 15.4489 30.123 15.5021C30.0059 15.5553 29.8787 15.5828 29.75 15.5828C29.6214 15.5828 29.4942 15.5553 29.377 15.5021C29.2599 15.4489 29.1554 15.3713 29.0707 15.2745Z" fill="#979797"/>
          </svg>
        </div>

        <SearchSuggestions
          open={showSuggestions}
          items={matchingSuggestions}
          onPick={(picked) => {
            setSearchQuery(picked);
            setShowSuggestions(false);
          }}
        />
      </div>
    );
  }

  return (
    <section className="max-w-full px-5 sm:px-6">
      <div className="relative hero-section mx-auto mt-6 w-[95%] h-[520px] rounded-[28px] overflow-hidden shadow-[0_10px_36px_rgba(0,0,0,0.14)]">
        <img src="/assets/home-hero.jpg" alt="Hero" className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex flex-col items-center text-white">
          <div className="pt-10 text-center px-4">
            <h1 className="text-[40px] font-extrabold leading-tight">
              Find Your Dream Home in One Click!
            </h1>
            <p className="mt-2 text-base opacity-95">
              Discover, Buy, or Rent Verified Properties with Ease.
            </p>
          </div>

          {/* MOBILE TOGGLE BUTTONS (only show on < md) */}
          <div className="mt-4 w-[83%] max-w-[1180px] md:hidden flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen((v) => !v)}
              className="rounded-full px-4 py-2 text-sm font-medium bg-white/90 text-[var(--clr-text)]
                         shadow border"
              style={{ borderColor: "var(--clr-border)" }}
            >
              {isMobileSearchOpen ? "Hide Search" : "Search"}
            </button>
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

          {/* SEARCH ROW (desktop always visible; mobile collapsible) */}
          <div
            className={`mt-60 w-[83%] max-w-[1180px] flex items-center
                        hf-collapsible md:h-auto search-bar ${isMobileSearchOpen ? "open" : ""}`}
          >
            <SearchBoxWithSuggestions
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              allProperties={allProperties}
            />

            <button
              type="button"
              className="ml-auto px-3 py-2 rounded-full text-sm font-medium text-[--clr-border] text-[14px]
                         shadow-lg border-[1px] hover:opacity-95"
              style={{ backgroundColor: "var(--clr-card)", borderColor: "var(--clr-primary)" }}
            >
              List Your Property
            </button>
          </div>
        </div>
      </div>

      {/* FILTER BAR (desktop always visible; mobile collapsible) */}
      <div className="relative -mt-10 flex justify-center">
        <div
          className={`w-full max-w-[80%] rounded-[46px] bg-white shadow-[0_18px_36px_rgba(0,0,0,0.08)]
                      px-7 py-7 flex flex-wrap items-center gap-3 justify-between
                      hf-collapsible  ${isMobileFiltersOpen ? "open" : ""}`}
        >
          <div
            className="flex items-center gap-3 rounded-full border-[1px] px-4 h-[48px] basis-[23%] min-w-[220px]"
            style={{ borderColor: "var(--clr-gray)" }}
          >
            <Icon icon="icon-park:efferent-three" className="fill-[var(--clr-locationtxt)] w-[20px] h-[20px]" />
            <CustomSelect
              value={selectedPurpose}
              onChange={setSelectedPurpose}
              options={["For Rent", "For Sale"]}
              className="w-full"
            />
          </div>

          <div
            className="flex items-center gap-3 rounded-full border-[1px] px-4 h-[48px] basis-[23%] min-w-[220px]"
            style={{ borderColor: "var(--clr-gray)" }}
          >
            <Icon icon="clarity:house-line" className="fill-[var(--clr-locationtxt)] w-[20px] h-[20px]" />
            <CustomSelect
              value={selectedPropertyType}
              onChange={setSelectedPropertyType}
              options={["House", "Apartment", "Villa"]}
              className="w-full"
            />
          </div>

          <div
            className="flex items-center gap-3 rounded-full border-[1px] px-4 h-[48px] basis-[23%] min-w-[220px]"
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

          <button
            onClick={handleFindClick}
            className="h-[48px] px-6 rounded-full text-white text-sm font-semibold shadow
                       shrink-0 basis-[23%] min-w-[200px] max-w-[220px]"
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

export default HeroFilter;
