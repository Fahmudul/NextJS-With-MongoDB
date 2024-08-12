"use client"; /*"use client" this line used to treat this component as a client component  */
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password logic
  const handleForgotPassword = async () => {
    try {
      console.log(user);
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            {loading ? "Loading..." : "Login"}
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                id="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <label className="label">
                <button
                  type="button"
                  onClick={() => handleForgotPassword()}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </button>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={onLogin}
                type="button"
              >
                Login{" "}
              </button>
              <Link
                href="/signup"
                className="label-text-alt link link-hover mt-3"
              >
                Dont have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
