import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react/dist/iconify.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("remember_email");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      setSubmitting(true);
      await signInWithEmailAndPassword(auth, email, password);
      if (remember) {
        localStorage.setItem("remember_email", email);
      } else {
        localStorage.removeItem("remember_email");
      }
      navigate("/"); 
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onForgotPassword() {
    try {
      if (!email) return setError("Enter your email to reset password.");
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err?.message || "Could not send reset email.");
    }
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "var(--clr-bg)" }}>
      <div className="max-w-100 h-screen">
        <div className="bg-white shadow-lg border overflow-hidden">
          {/* Top bar */}
          <Navbar />

          {/* Content */}
          <div className="lg:flex">
            {/* LEFT: form  */}
            <section className="px-0 py-0 login flex flex-col justify-center items-center lg:basis-[40%] lg:max-w-none">
              <h1 className="text-[34px] pb-4 sm:text-[32px] font-extrabold tracking-tight text-center">
                Log In
              </h1>

              <form onSubmit={onSubmit} className="mt-2 space-y-5 w-full max-w-[453px]">
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
                      <span className="msr msr1 opacity-80 w-[24px] h-[24px]" aria-hidden>
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>

                  {/* Row: remember + forgot */}
                  <div className="flex items-center justify-between mt-2">
                    <label className="inline-flex items-center gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      Remember Me
                    </label>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p
                    className="text-sm bg-red-50 border rounded-md px-3 py-2"
                    style={{ borderColor: "#fecaca", color: "#A81212" }}
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <div className="register-btn">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex justify-center align-middle w-full rounded-full text-white py-2 shadow hover:opacity-95 disabled:opacity-60 max-w-[417px]"
                    style={{ backgroundColor: "var(--clr-primary)", color: "var(--clr-card)" }}
                  >
                    {submitting ? "Logging In..." : "Log In"}
                  </button>
                </div>

                {/* Divider + Socials  */}
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <div className="mt-4 pb-5 flex justify-center items-center gap-6">
                    <button type="button" className="p-2 rounded-full border hover:bg-gray-100">
                      <img src="/assets/apple-icon.png" alt="Apple" className="h-9 w-9" />
                    </button>
                    <button type="button" className="p-2 rounded-full border hover:bg-gray-100">
                      <img src="/assets/facebook.jpeg" alt="Facebook" className="h-9 w-9" />
                    </button>
                    <button type="button" className="p-2 rounded-full border hover:bg-gray-50">
                      <img src="/assets/google-icon.png" alt="Google" className="h-9 w-9" />
                    </button>
                  </div>
                </div>

                {/* Bottom link */}
                <div>
                  <p
                    className="text-sm pt-5 text-center register-bottom-text"
                    style={{ color: "var(--clr-muted)" }}
                  >
                    Doesn’t have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium log-in-link"
                      style={{ color: "var(--clr-primary)" }}
                    >
                      Create One
                    </Link>
                  </p>
                </div>
              </form>
            </section>

            {/* RIGHT: image (unchanged) */}
            <aside className="relative hidden lg:block lg:basis-[60%] rounded-l-2xl overflow-hidden py-5">
              <div className="rounded-tl-3xl rounded-bl-3xl overflow-hidden">
                <img src="/assets/signup-hero.jpg" alt="House" className="register-hero" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;