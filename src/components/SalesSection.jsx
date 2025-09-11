import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import useProperties from "../hooks/useProperties";

function SalesSection() {
  const { data: all, loading, err } = useProperties();

  

  const isSale = (id) => Number(id) % 2 === 1;

  const localImages = [
    "/assets/saleproperty-1.jpg",
    "/assets/saleproperty-2.jpg",
    "/assets/saleproperty-3.jpg",
    "/assets/saleproperty-4.jpg",
    
  ];
  const getStaticImg = (img) =>
    localImages[img % localImages.length] || "/assets/fallback.jpg";

  const getTitle = (data) => data.name || "Premium Family Home";
  const getCity = (data) =>
    [data.state, data.countryCode].filter(Boolean).join(", ") || "New York, NY";
  const getPrice = (data) => {
    const value = data.price ?? data.amount ?? data.cost;
    const num = Number(value);
    return isFinite(num) && num > 0 ? num : 450000;
  };
  const getDesc = (data) =>
    data.description ||
    "Spacious 3BHK apartment in a prime location with modern amenities.";

  const saleItems = useMemo(() => all.filter((data) => isSale(data.id)), [all]);

  return (
    <section className="mt-12 cards-sales-1 mb-24 m-auto w-[95%] px-2">
      {/* Header */}
      <div className="flex items-center mb-0 px-4 justify-between gap-4 flex-direction-row">
        <div>
          <h2 className="text-[40px] sm:text-[32px] font-extrabold text-[var(--clr-primary)]">
            Best Properties Available For Sale
          </h2>
          <p className="text-[18px] sm:text-[20px] mt-1 text-[var(--clr-light-gray)] max-w-[70%] leading-[28px] tracking-[0.02em]">
            Browse our top-rated properties for sale, featuring premium listings
            tailored to your needs. Find your dream home today!
          </p>
        </div>

        <button
          className="shrink-0 rounded-full px-10 py-3 text-white text-[18px] font-medium hover:opacity-95"
          style={{ backgroundColor: "var(--clr-primary)" }}
        >
          View More Properties
        </button>
      </div>

      {/* Horizontal scroll rail */}
      <div className="mt-12 cards-sale -mx-2 overflow-x-auto no-scrollbar">
        <ul className="px-0 cards-sales flex gap-6 min-w-max snap-x snap-mandatory">
          {(loading ? Array.from({ length: 4 }) : saleItems).map((data, index) => (
            <li
              key={data?.id || index}
              className="snap-start shrink-0 w-[341px] h-[420px] rounded-[12px] bg-[var(--clr-verylight-gray)]
                         shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                         hover:shadow-[8px_8px_20px_rgba(0,0,0,0.12)]
                         transition overflow-hidden"
              style={{ borderColor: "var(--clr-border)" }}
            >
              {/* Image */}
              <div className="flex justify-center pt-3">
                {loading ? (
                  <div className="w-[320px] h-[200px] rounded-[12px] bg-gray-200 animate-pulse" />
                ) : (
                  <img
                    src={getStaticImg(index)}
                    onError={(e) => (e.currentTarget.src = "/assets/fallback.jpg")}
                    alt={getTitle(data)}
                    className="w-[320px] h-[200px] object-cover rounded-[12px]"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Body */}
              <div className="px-4 pt-3">
                {/* Location + rating */}
                <div className="flex items-center mb-3 justify-between text-[18px] mb-2">
                  <div className="inline-flex mt-4 items-center gap-1.5 text-[var(--clr-locationtxt)]">
                    <Icon
                      icon="mdi:location-radius-outline"
                      className="text-base w-[30px] h-[30px]"
                    />
                    <span className="truncate text-[18px] max-w-[200px]">
                      {loading ? "Loading…" : getCity(data)}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[var(--clr-locationtxt)]">
                    <Icon
                      icon="ic:outline-star"
                      className="text-[#FFD700]"
                    />
                    <span>4.5/5</span>
                  </div>
                </div>

                <p className="mt-2 text-[16px] leading-snug text-[var(--clr-text)] leading-[25px] max-w-[200px] line-clamp-3">
                  {loading ? "Fetching description…" : getDesc(data)}
                </p>
              </div>

              {/* Footer */}
              <div className="px-4 mt-4 flex items-center justify-between">
                <button
                  className="rounded-full w-[128px] h-[38.27px] px-5 py-2 text-[16px] font-semibold text-white"
                  style={{ backgroundColor: "var(--clr-primary)" }}
                >
                  Buy Now
                </button>
                <div className="text-[24px] text-400 text-[var(--clr-price)]">
                  {loading ? (
                    <span className="opacity-60">$—</span>
                  ) : (
                    <>${Intl.NumberFormat("en-US").format(getPrice(data))}</>
                  )}
                </div>
              </div>
            </li>
          ))}

          {!loading && saleItems.length === 0 && (
            <li className="text-sm text-[var(--clr-muted)] py-8">
              No sale properties found.
            </li>
          )}
        </ul>
      </div>

      {/* Error */}
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
    </section>
  );
}

export default SalesSection;
