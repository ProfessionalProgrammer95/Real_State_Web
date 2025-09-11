import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react/dist/iconify.js";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your full name.");
    if (password !== confirm) return setError("Passwords do not match.");
    try {
      setSubmitting(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "var(--clr-bg)" }}>
      <div className="max-w-100 h-screen">
        <div
          className="bg-white  shadow-lg border overflow-hidden"
          
        >
          {/* Top bar */}
          <Navbar />
          {/* Content grid */}
          <div className="lg:flex">
            {/* Left: form */}
            <section className="px-0 py-0 login flex flex-col justify-center items-center lg:basis-[40%] lg:max-w-none">
              <h1 className="text-[34px] pb-3 sm:text-[32px] font-extrabold tracking-tight text-center">
                Create new account
              </h1>

              <form onSubmit={onSubmit} className="mt-2 space-y-5 w-full max-w-[453px]">
                {/* Name */}
                <div>
                  <label className="block register-text text-sm font-medium mb-1"
                  >Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Your Full Name"
                      className="w-full rounded-lg border px-4 py-2 pr-10 outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--clr-border)" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block register-text text-sm font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter Your Email Id"
                      className="w-full rounded-lg border px-4 py-2 pr-10 outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--clr-border)" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  <Icon icon="iconamoon:email-thin" className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 w-[24px] h-[24px]" />
                    
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block register-text text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                      className="w-full rounded-lg border px-4 py-2 pr-10 outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--clr-border)" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-md hover:bg-gray-100"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <span className="msr opacity-80 w-[24px] h-[24px]" aria-hidden>
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block register-text text-sm font-medium mb-1">Confirm Password</label>
                  <div className="relative ">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Your Password"
                      className="w-full rounded-lg border px-4 py-2 pr-10 outline-none focus:ring-2 transition"
                      style={{ borderColor: "var(--clr-border)" }}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center rounded-md hover:bg-gray-100"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      <span className="msr opacity-80 w-[24px] h-[24px]" aria-hidden>
                        {showConfirm ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p
                    className="text-sm bg-red-50 border rounded-md px-3 py-2"
                    style={{ borderColor: "#fecaca", color: "#b91c1c" }}
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <div className="register-btn ">
                  
                <button
                  type="submit"
                  disabled={submitting}
                  className=" flex justify-center align-middle w-full rounded-full text-white py-2  shadow hover:opacity-95 disabled:opacity-60 max-w-[417px]"
                  style={{ backgroundColor: "var(--clr-primary)", color: "var(--clr-card)" }}
                >
                  {submitting ? "Creating..." : "Create Account"}
                </button>
                </div>
                
                <div>
                  <p
                  className="text-sm pb-5 text-center register-bottom-text"
                  style={{ color: "var(--clr-muted)" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium log-in-link"
                    style={{ color: "var(--clr-primary)" }}
                  >
                    Log In
                  </Link>
                </p>
                </div>
              </form>
            </section>
            {/* Right: image */}
            <aside className="relative hidden lg:block lg:basis-[60%] rounded-l-2xl overflow-hidden py-5">
              <div className="rounded-tl-3xl rounded-bl-3xl overflow-hidden">
                <img
                  src="/assets/signup-hero.jpg"
                  alt="House"
                  className="register-hero"
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;