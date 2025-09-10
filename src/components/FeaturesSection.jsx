import { Icon } from "@iconify/react";


function FeaturesSection() {
  return (
    <section className="w-100 max-w-[100%] m-auto mt-12 px-4">
      {/* What We Do */}
      <div className="text-center">
        <h2 className="text-[35px] sm:text-[26px] text-700 font-extrabold text-[var(--clr-primary)]">
          What We Do?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[20px] text-[var(--clr-light-gray)] max-w-[600px] mx-auto">
          Helping you find, buy, and rent the perfect <br />property with ease.
        </p>
      </div>

      {/* Features Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Card 1 */}
      <div className="w-[300px] h-[259px] rounded-[12px] bg-[var(--clr-card-gray)] p-6 mx-auto flex flex-col items-center justify-center text-center transition-all hover:bg-white hover:shadow-[11px_11px_10px_rgba(0,0,0,0.2)]">
        {/* Icon badge */}
        <div className="w-[77px] h-[77px] rounded-full grid place-items-center mb-4 bg-[#BEBEBE] text-[var(--clr-primary)]">
          <Icon icon="flat-color-icons:sales-performance" className="w-[40px] h-[40px] text-[#1E3A8A] icon-primary"/>
        </div>
        <h3 className="text-[20px] text-[var(--clr-black)] mb-4" >Buy & Sell <br/> Properties</h3>
        <p className="text-sm text-[12px] text-[var(--clr-black)] text-center">
          Find verified homes for sale or list your property with ease.
        </p>
      </div>

      {/* Card 2 */}
      <div className="w-[300px] h-[259px] rounded-[12px] bg-[var(--clr-card-gray)] p-6 mx-auto flex flex-col items-center justify-center text-center transition-all hover:bg-white hover:shadow-[11px_11px_10px_rgba(0,0,0,0.2)]">
        <div className="w-[77px] h-[77px] rounded-full grid place-items-center mb-4 bg-[#BEBEBE] text-[var(--clr-primary)]">
          <Icon icon="mdi:key-chain" className="w-[40px] h-[40px]" />
        </div>
        <h3 className="text-[20px] text-[var(--clr-black)] mb-4">Find Rental <br /> Homes</h3>
        <p className="text-sm text-[12px] text-[var(--clr-black)] text-center">
          Browse through thousands of rental options suited to your needs.
        </p>
      </div>

      {/* Card 3 */}
      <div className="w-[300px] h-[259px] rounded-[12px] bg-[var(--clr-card-gray)] p-6 mx-auto flex flex-col items-center justify-center text-center transition-all hover:bg-white hover:shadow-[11px_11px_10px_rgba(0,0,0,0.2)]">
        <div className="w-[77px] h-[77px] rounded-full grid place-items-center mb-4 bg-[#BEBEBE] text-[var(--clr-primary)]">
          <Icon icon="mingcute:mic-ai-fill" className="w-[40px] h-[40px]" />
        </div>
        <h3 className="text-[20px] text-[var(--clr-black)] mb-4">Smart AI <br /> Property Search</h3>
        <p className="text-sm text-[12px] text-[var(--clr-black)] text-center">
          Get instant recommendations based on your budget &amp; location.
        </p>
      </div>

      {/* Card 4 */}
      <div className="w-[300px] h-[259px] rounded-[12px] bg-[var(--clr-card-gray)] px-7 py-3 mx-auto
                      flex flex-col items-center justify-center text-center
                      transition-all hover:bg-white hover:shadow-[11px_11px_10px_rgba(0,0,0,0.2)]">
        <div className="w-[77px] h-[77px] rounded-full grid place-items-center mb-4
                        bg-[#BEBEBE] text-[var(--clr-primary)]">
          <Icon icon="basil:lock-solid" className="w-[40px] h-[40px]" />
        </div>
        <h3 className="text-[20px] text-[var(--clr-black)] mb-4">Safe & Secure Transactions</h3>
        <p className="text-sm text-[12px] text-[var(--clr-black)] text-center">
          Verified listings &amp; secure deals to ensure a smooth experience.
        </p>
      </div>
      </div>


      {/* Featured Property */}
      <div className="mt-16  m-auto w-[95%] ">
        <div className="flex justify-between property-header items-center mb-24">
          <h2 className="text-[40px] text-700 font-extrabold text-[var(--clr-primary)]">
            Featured Property
          </h2>
          <button className="btn px-5 py-2 rounded-full text-sm font-medium text-[--clr-primary] bg-[--clr-card] border-[2px] border-[--clr-primary] hover:bg-gray-50 flex items-end gap-2">
            See 268 New Projects{" "}
            <Icon icon="clarity:arrow-line" className="w-4 h-4 rotate-45" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Big Left Card - spans 2 cols */}
        <div className="relative col-span-1 lg:col-span-2 h-[500px]">
          <img
            src="/assets/property1.jpg"
            alt="Kenanga Residence"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-[var(--clr-card)]">
            <p className="text-[18px] opacity-90">By Finder & Projects</p>
            <h3 className="text-[25px] font-semibold">Kenanga Residence</h3>
          </div>
        </div>

        {/* Middle card - spans 1 col */}
        <div className="col-span-1 h-[500px]">
          <img
            src="/assets/property2.jpg"
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right stacked cards - 1 col, 2 rows */}
        <div className="col-span-1 grid grid-rows-2 gap-6">
          <div className="h-[239px]">
            <img
              src="/assets/property3.jpg"
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[239px]">
            <img
              src="/assets/property4.jpg"
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      </div>
    </section>
  );
}

export default FeaturesSection;
