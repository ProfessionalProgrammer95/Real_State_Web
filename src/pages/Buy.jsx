import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import PropertyCard from "../components/PropertyCard";
import BuyHeroFilter from "../components/BuyHeroFilter";

function Buy({ onResults }) {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [purpose, setPurpose] = useState("For Buying");
  const [ptype, setPtype] = useState("House");
  const [country, setCountry] = useState("Indonesia");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
        );
        const data = await res.json();
        setAll(Array.isArray(data) ? data : []);
        const unique = Array.from(
          new Set((data || []).map((d) => d.country).filter(Boolean))
        );
        if (unique.length && !unique.includes(country)) setCountry(unique[0]);
      } catch {
        setErr("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const derivePurpose = (id) => (+id % 2 === 0 ? "For Buying" : "For Rent");
  const deriveType = (id) => {
    const m = +id % 3;
    return m === 0 ? "House" : m === 1 ? "Apartment" : "Villa";
  };

  const countries = useMemo(
    () => Array.from(new Set(all.map((d) => d.country).filter(Boolean))),
    [all]
  );

  const filtered = useMemo(() => {
    return all.filter((p) => {
      if (purpose && derivePurpose(p.id) !== purpose) return false;
      if (ptype && deriveType(p.id) !== ptype) return false;
      if (country && p.country !== country) return false;
      return true;
    });
  }, [all, purpose, ptype, country]);

  function handleFind() {
    if (onResults) onResults(filtered);
  }




  return (
    <div className="min-h-screen bg-white">
      <MenuBar />
      <BuyHeroFilter onResults={handleFind} />
      <PropertyCard />
      <Footer />
    </div>
  )
}

export default Buy
