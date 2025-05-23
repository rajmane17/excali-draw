"use client";
import { useEffect, useState } from "react";
import Input from "@repo/ui/input";
import axios from "axios";
import { BACKEND_URL } from "app/config";
import { useRouter } from "next/navigation";

interface AuthPageProps {
  isSigninPage: boolean;
}

export const AuthPage = ({ isSigninPage }: AuthPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSignIn() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password,
      });
      console.log(response.data.data.user);
      router.push("/");
      return response.data.data.user;
    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message || "Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name,
        email,
        password,
        username,
      });
      console.log(response.data.data.user);
      router.push("/");
      return response.data.data.user;
    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message || "Sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={
        mounted
          ? "min-h-screen w-full bg-[#F5F8FF] flex items-center justify-center p-4"
          : "min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ..."
      }>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1A202C]">
            {isSigninPage ? "Sign In to ExcaliDraw" : "Join ExcaliDraw"}
          </h1>
          <p className="text-[#718096] mt-2">
            {isSigninPage
              ? "Access your canvas and start collaborating"
              : "Create an account to start drawing together"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          {!isSigninPage && (
            <>
              <Input
                type="text"
                value={username}
                placeholder="Enter Username..."
                handleChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all"
              />
              <Input
                type="text"
                value={name}
                placeholder="Enter Name..."
                handleChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all"
              />
            </>
          )}
          <Input
            type="email"
            value={email}
            placeholder="Enter Email..."
            handleChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all"
          />
          <Input
            type="password"
            value={password}
            placeholder="Enter Password..."
            handleChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all"
          />
          <button
            onClick={isSigninPage ? handleSignIn : handleSignUp}
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-[#0066FF]/50 cursor-not-allowed"
                : "bg-[#0066FF] hover:bg-[#0055CC] active:bg-[#0044AA]"
            }`}
          >
            {loading
              ? "Processing..."
              : isSigninPage
              ? "Sign In"
              : "Sign Up"}
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center text-sm text-[#718096]">
          {isSigninPage ? (
            <p>
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-[#0066FF] hover:underline font-medium"
              >
                Sign Up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-[#0066FF] hover:underline font-medium"
              >
                Sign In
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};