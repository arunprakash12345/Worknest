import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMentor, setIsMentor] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: isMentor ? "MENTOR" : "STUDENT",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Account created successfully 🎉");
      setName("");
      setEmail("");
      setPassword("");
      setIsMentor(false);
      setIsLogin(true);
    } else {
      toast.error(data.message);
    }
  };
  const handleLogin = async () => {
    // console.log("LOGIN CLICKED");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Welcome back 👋");

      navigate("/", { replace: true });
    } else {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-[400px]">
          <h1 className="text-2xl font-semibold mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            {isLogin
              ? "Login to continue your journey"
              : "Sign up today and unlock possibilities."}
          </p>

          <div className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!isLogin && (
              <div className="flex items-center justify-between">
                <label htmlFor="mentor-toggle" className="text-sm text-gray-700">
                  Are you a mentor?
                </label>
                <button
                  id="mentor-toggle"
                  type="button"
                  role="switch"
                  aria-checked={isMentor}
                  onClick={() => setIsMentor(!isMentor)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isMentor ? "bg-slate-900" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isMentor ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            )}

            <button
              className="w-full mt-6 bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 transition"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
            <p className="text-sm text-center text-gray-500 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white flex items-center justify-center p-10 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Content */}
        <div className="relative z-10 max-w-md">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-semibold">WorkNest</span>
          </div>

          {/* Main headline */}
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Manage your cohorts with clarity and ease
          </h2>

          <p className="text-slate-300 mb-8 leading-relaxed">
            The all-in-one platform for mentors and students to collaborate, track progress, and achieve goals together.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Create and assign tasks effortlessly</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Track progress in real-time</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-slate-300">Collaborate with built-in discussions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
