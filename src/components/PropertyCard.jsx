import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

function PropertyCard({ filters }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
const [active, setActive] = useState(null);



const fmt = {
  money: (n) => `$${Intl.NumberFormat("en-US").format(Number(n || 0))}`,
  date:  (iso) => (iso ? new Date(iso).toLocaleString() : "—"),
};

const fullLocation = (p) =>
  [p?.city, p?.state, p?.country].filter(Boolean).join(", ") || "—";


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
        );
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr("Failed to load featured properties.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);


 // helpers
const getImg = (p) =>
  p?.image || p?.photo || p?.thumbnail || p?.avatar || "/assets/fallback.jpg";

const getTitle = (p) => p?.name || "Green Villa";
const getCity = (p) =>
   p?.state || "Uttar Pradesh";
const getDesc = (p) =>
  p?.description ||
  "Spacious 3BHK apartment in a prime location with modern amenities.";
const getPrice = (p) => {
  const val = p?.price ?? p?.amount ?? p?.cost;
  const n = Number(val);
  return isFinite(n) && n > 0 ? n : 450000;
};

  // --- apply filters to API data ---
  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (filters?.purpose && p.purpose !== filters.purpose) return false;
      if (filters?.ptype && p.type !== filters.ptype) return false;
      if (filters?.location && p.city !== filters.location) return false;
      return true;
    });
  }, [items, filters]);

  // --- pick 2 items for featured ---
  const featured = [
    {
      img: "/assets/buyproperty-image1.png", // static
      data: filtered[0] || items[0] || {}, // fill from filter/API
    },
    {
      img: "/assets/buyproperty-image2.png", // static
      data: filtered[1] || items[1] || {}, // fill from filter/API
    },
  ];
  function ItemRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-9 h-9 shrink-0 grid place-items-center rounded-xl bg-[var(--clr-primary)]/10 text-[var(--clr-primary)]">
        <Icon icon={icon} className="w-[30px] h-[30px]" />
      </span>
      <span className="text-[14px] leading-[1.2]">
        <b>{label} </b>: {value || "—"}
      </span>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-[var(--clr-primary)]/10 p-3">
      <div className="text-[16px] text-[var(--clr-muted)]">{label}</div>
      <div className="text-[16px] font-semibold">{value}</div>
    </div>
  );
}


  return (
    <section className="mt-10 m-auto w-[92%]">
      {/* header row */}
      <div className="flex items-center property-header justify-between mt-16 mb-12">
        <h2 className="text-[40px] px-4 font-extrabold text-[var(--clr-primary)]">
          Featured Property
        </h2>
        <button
          className="rounded-full px-5 py-2 text-[14px] font-medium border-[2px] border-[var(--clr-primary)] text-[var(--clr-primary)] hover:opacity-95 property-viewmore"
          style={{ backgroundColor: "var(--clr-card)" }}
        >
          See 268 New Projects{" "}
          <Icon
            icon="clarity:arrow-line"
            className="inline ml-1 rotate-[38.63deg] w-18 h-18"
          />
        </button>
      </div>

      {/* grid */}
      <div className="mt-6 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featured.map((fp, idx) => {
          const d = fp.data || {};
          return (
            <div
              key={idx}
              className="relative  overflow-visible bg-transparent"
            >
              {/* IMAGE */}
              <div className="h-[610px] rounded-[18px] w-full pb-[92px] property-card-image">
                <img
                  src={fp.img}
                  alt={getTitle(d)}
                  className="h-full w-full object-cover rounded-[18px]"
                  loading="lazy"
                />
              </div>

            {/* === Floating card === */}
            <div className="absolute left-12 bottom-0 floating-card">
            <div
                className="
                w-[590px] h-[200px]
                rounded-[20px] bg-white
                px-6 py-5
                shadow-[6px_14px_18px_rgba(0,0,0,0.2)] floating-card
                "
            >
                {/* Title row */}
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[24px]  text-[var(--clr-black)]">
                    <Icon
                    icon="mdi:location-radius-outline"
                    className="w-[30px] h-[30px] text-[var(--clr-primary)]"
                    />
                    <span className="truncate font-medium txt-floating">
                    {getTitle(d)}, {getCity(d)}
                    </span>
                </div>

                <button
                    className="grid place-items-center  hover:bg-gray-200 transition"
                    title="Save"
                >
                    <Icon icon="stash:save-ribbon" className="text-[var(--clr-primary)] w-[30px] h-[30px]" />
                </button>
                </div>

                {/* Description */}
                <p className="text-[16px] text-[var(--clr-muted)] leading-[25px] mb-3 line-clamp-2 max-w-[400px]">
                {getDesc(d)}
                </p>
                <div className="w-[590px] p-0 m-0 -ml-6 h-0 border-[2px] border-[#00000033] mb-4 card-underline"></div>
                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                <div className="text-[24px] font-semibold text-[var(--clr-text)]">
                    ${Intl.NumberFormat("en-US").format(getPrice(d))}
                </div>

                <button
                    onClick={() => {
                    setActive(d);
                    setOpen(true);
                    }}
                    className="h-[35px] w-[121px] px-5 rounded-[31px] text-[14px] floating-btn font-semibold text-white hover:opacity-95"
                    style={{ backgroundColor: "var(--clr-primary)" }}
                >
                    Know More
                </button>
                </div>
            </div>
            </div>

            </div>
          );
        })}
      </div>
      <div className="h-12" />
      {err ? <p className="text-sm text-red-600">{err}</p> : null}

    {open && active && (
  <div
    className="fixed inset-0 z-[9999] bg-black/55 backdrop-blur-[2px] flex items-center justify-center p-4"
    onClick={() => setOpen(false)}
  >
    <div
      className="w-full max-w-[980px] bg-white rounded-2xl overflow-visible shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HERO */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={getImg(active)}
          onError={(e) => {
            e.currentTarget.src = "/assets/fallback.jpg";
          }}
          alt={active?.name || "Property"}
          className="h-full w-full object-cover scale-[1.02]"
          loading="lazy"
        />
        {/* subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent" />

        {/* Title / location glass card */}
        <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-3">
          <div className="backdrop-blur-md bg-white/75 border border-white/70 shadow-lg rounded-2xl px-4 py-3">
            <h3 className="text-[22px] font-extrabold text-[var(--clr-primary)] leading-tight">
              {active?.name || "—"}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-[2px] text-[12px] shadow-sm">
                <Icon
                  icon="mdi:map-marker-outline"
                  className="text-[var(--clr-primary)]"
                />
                {fullLocation(active)}
              </span>
              {active?.countryCode && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-[2px] text-[12px] shadow-sm">
                  <Icon icon="mdi:earth" className="text-[var(--clr-primary)]" />
                  {active.countryCode}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full grid place-items-center bg-white/85 hover:bg-white text-[var(--clr-text)] shadow-lg"
            aria-label="Close"
          >
            <Icon icon="mdi:close" className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6">
        {/* Intro */}
        <p className="text-[15px] leading-relaxed text-[var(--clr-text)]">
          {active?.description ||
            "Spacious 3BHK apartment in a prime location with modern amenities."}
        </p>

        {/* GRID */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT – details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex w-2 h-2 rounded-full bg-[var(--clr-primary)]" />
              <h4 className="text-[16px] font-semibold">Details</h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <ItemRow
                  icon="mdi:home-outline"
                  label="Building No."
                  value={active?.buildingNumber}
                />
                <ItemRow
                  icon="mdi:compass-outline"
                  label="Direction"
                  value={active?.cardinalDirection}
                />
                <ItemRow
                  icon="mdi:cash"
                  label="Price"
                  value={fmt.money(active?.price)}
                />
                <ItemRow
                  icon="mdi:clock-outline"
                  label="Created"
                  value={fmt.date(active?.createdAt)}
                />
              </div>

              <div className="space-y-3">
                <ItemRow
                  icon="mdi:map-marker-outline"
                  label="Address"
                  value={
                    [
                      active?.buildingNumber,
                      active?.cardinalDirection,
                      active?.city,
                      active?.state,
                      active?.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"
                  }
                />
                <ItemRow
                  icon="mdi:earth"
                  label="Time Zone"
                  value={active?.timeZone}
                />
                <ItemRow
                  icon="mdi:account-outline"
                  label="Owner"
                  value={active?.ownerName}
                />
                <ItemRow
                  icon="mdi:phone"
                  label="Contact"
                  value={active?.contactNumber}
                />
              </div>
            </div>

            {/* Map + coords */}
            {(typeof active?.latitude === "number" ||
              typeof active?.longitude === "number") && (
              <>
                <div className="text-[13px] text-[var(--clr-muted)]">
                  Coords:&nbsp;
                  <b>{active?.latitude ?? "—"}</b>,{" "}
                  <b>{active?.longitude ?? "—"}</b>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
                  {typeof active?.latitude === "number" &&
                  typeof active?.longitude === "number" ? (
                    <>
                      <iframe
                        title="map"
                        src={`https://www.google.com/maps?q=${active.latitude},${active.longitude}&z=12&output=embed`}
                        className="w-full h-[280px]"
                        loading="lazy"
                      />
                      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[12px] shadow">
                        <Icon
                          icon="mdi:crosshairs-gps"
                          className="text-[var(--clr-primary)]"
                        />
                        {active.latitude}, {active.longitude}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-[220px] grid place-items-center text-[13px] text-[var(--clr-muted)]">
                      Map unavailable
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* RIGHT – at a glance */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.06)] bg-white p-5">
              <h4 className="text-[16px] font-semibold mb-4">At a Glance</h4>

              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Price" value={fmt.money(active?.price || 45000)} />
                <StatCard label="Country" value={active?.country || "—"} />
                <StatCard label="Owner" value={active?.ownerName || "—"} />
                <StatCard label="Code" value={active?.countryCode || "—"} />
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  className="h-[40px] px-6 rounded-full text-white text-[14px] font-semibold shadow"
                  style={{ backgroundColor: "var(--clr-primary)" }}
                >
                  Contact Agent
                </button>
                <button className="h-[40px] px-5 rounded-full text-[14px] bg-gray-100 hover:bg-gray-200">
                  Save
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-[var(--clr-primary)]/10 to-transparent p-4 border border-[var(--clr-primary)]/15">
              <div className="text-[13px] text-[var(--clr-muted)]">
                Tip: Bookmark this listing to receive quick updates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


    </section>

    
  );
}

export default PropertyCard;
