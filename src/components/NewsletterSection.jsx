import { Icon } from "@iconify/react";
import { useState } from "react";

function NewsletterSection() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Select User Type");
    const options = ["Buyer", "Renter", "Agent"];
  return (
    <section className="mt-16 w-[95%] mx-auto px-4">
      {/* Top: form row */}
      <div className=" mb-10">
        <h2 className="text-[28px] sm:text-[32px] font-extrabold text-[var(--clr-primary)]">
          Start Your Journey Today!
        </h2>
        <p className="text-[16px] text-[var(--clr-light-gray)] mt-2">
          Create a profile in seconds and find your ideal home.
        </p>

        <div className="mt-6 flex flex-wrap text-[16px] text-[var(--clr-input-text)] justify-between gap-3 newsletter-form">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-[350px] h-[50px] border-[1px] rounded-[8px] px-4 outline-none"
            style={{ borderColor: "var(--clr-lightgray)", boxShadow: "0px 2px 4px 0px rgba(0, 0, 16, 0.2)" }}
          />
          <div className="relative w-[350px] button">
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-[50px] flex items-center justify-between rounded-[8px] px-4 text-left bg-white border border-[var(--clr-lightgray)] outline-none"
        style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 16, 0.2)" }}
      >
        <span className="text-[16px] text-[var(--clr-input-text)]">
          {selected}
        </span>
        <Icon
          icon={open ? "grommet-icons:up" : "grommet-icons:down"}
          className="w-5 h-5 text-gray-500"
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <ul
          className="absolute left-0 right-0 mt-1 bg-white rounded-[8px] border border-[var(--clr-lightgray)] shadow-lg z-10"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
          <input
            type="text"
            placeholder="Enter Your Location"
            className="w-[350px] h-[50px] border-[1px] rounded-[8px] px-4 outline-none"
            style={{ borderColor: "var(--clr-lightgray)", boxShadow: "0px 2px 4px 0px rgba(0, 0, 16, 0.2)" }}
          />
          <button
            className="h-[50px] w-[250px] px-8 rounded-full text-[18px] font-semibold text-white font-medium"
            style={{ backgroundColor: "var(--clr-primary)" }}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Bottom: content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-28 mb-56 items-center">
        {/* Left: images */}
        <div className="relative propertiesimages flex justify-center lg:justify-start mb-24">
          <img
            src="/assets/Property-image1.jpg"
            alt="Property"
            className="w-[510px] h-[533px] object-cover rounded-lg shadow-lg border-[10px] border-[var(--clr-image-border)] Property1"
          />
          <img
            src="/assets/Property-image2.jpg"
            alt="Property"
            className="w-[408px] h-[405px] object-cover rounded-lg shadow-lg absolute top-[425px] left-[520px] -translate-x-3/4 -translate-y-1/2 border-[10px] border-[var(--clr-card-gray)] newsletter-image Property2"
          />
        </div>

        {/* Right: text + icons */}
        <div className="mt-4">
          <h3 className="text-[40px] text-center font-extrabold text-[var(--clr-primary)]  tracking-[0.02em] mb-20">
            We Provide Latest Properties <br /> For Our Valuable Clients
          </h3>

          <div className="space-y-6 max-w-[500px] ml-auto text-left ">
            {/* Item 1 */}
            <div className="flex items-start gap-6">
              <Icon
                icon="mdi:cash-multiple" 
                className="w-16 h-16 text-[var(--clr-primary)]"
              />
              <div>
                <h4 className="text-[28px] tracking-[0.02em] text-[var(--clr-primary)] font-semibold">Budget Friendly</h4>
                <p className="text-[18px] tracking-[0.02em] text-[var(--clr-light-gray)] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Venanatis sed ac aenean
                  tempus. Lectus quis pretium varius iaculis sed.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <Icon
                icon="codicon:workspace-trusted"
                className="w-16 h-16 text-[var(--clr-primary)]"
              />
              <div>
                <h4 className="text-[28px] tracking-[0.02em] text-[var(--clr-primary)] font-semibold">Trusted By Thousand</h4>
                <p className="text-[18px] text-[var(--clr-light-gray)] tracking-[0.02em] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Venanatis sed ac aenean
                  tempus. Lectus quis pretium varius iaculis sed.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <Icon
                icon="et:map"
                className="w-16 h-16 text-[var(--clr-primary)]"
              />
              <div>
                <h4 className="text-[28px] tracking-[0.02em] text-[var(--clr-primary)] font-semibold">Prime Location</h4>
                <p className="text-[18px] text-[var(--clr-light-gray)] tracking-[0.02em] leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Venanatis sed ac aenean
                  tempus. Lectus quis pretium varius iaculis sed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default NewsletterSection;