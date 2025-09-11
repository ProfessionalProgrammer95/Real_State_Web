import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import PropertyCard from "../components/PropertyCard";
import BuyHeroFilter from "../components/BuyHeroFilter";

function Buy() {

  return (
    <div className="min-h-screen bg-white">
      <MenuBar />
      <BuyHeroFilter />
      <PropertyCard />
      <Footer />
    </div>
  )
}

export default Buy
