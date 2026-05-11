import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async () => {
    const res = await fetch("http://localhost:5002/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "ADMIN",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Account created successfully 🎉");
      setName("");
      setEmail("");
      setPassword("");
      setIsLogin(true);
    } else {
      toast.error(data.message);
    }
  };
  const handleLogin = async () => {
    // console.log("LOGIN CLICKED");
    const res = await fetch("http://localhost:5002/api/auth/login", {
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
            <button
              className="w-full mt-6 bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 transition"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <button className="w-full border py-2 rounded-md mb-2 hover:bg-gray-100">
              Continue with Google
            </button>

            <button className="w-full border py-2 rounded-md hover:bg-gray-100">
              Continue with Apple
            </button>
            <p className="text-sm text-center text-gray-500 mt-4">
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
      <div className="w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-10">
        <div className="max-w-md">
          <p className="text-lg leading-relaxed">
            Beyond UI: It's the design equivalent of discovering the theory of
            relativity for your creativity!
          </p>
          <p className="mt-4 text-sm opacity-70">- Inspired Thought</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
