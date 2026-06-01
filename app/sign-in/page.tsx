"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const images = [
  "/assets/vectorart2.jpeg",
  "/assets/vectorart3.jpeg",
  "/assets/vectorart4.jpeg",
] as const;

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          window.location.href = "/dashboard";
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Failed to sign in");
          setIsLoading(false);
        },
      },
    );
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");

    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          setError(ctx.error.message || `Failed to sign in with ${provider}`);
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Left Section - Image Carousel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-[#0B0B0F] lg:block">
        {/* Image */}
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt="Auth visual"
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 1}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent" />
        </div>

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </Link>
        </div>

        {/* Back to website button */}
        <div className="absolute top-8 right-8 z-10">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-[#F5F5F5]/90 hover:bg-white/10 hover:text-[#F5F5F5]"
            >
              Back to website
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-12">
          <div className="text-center">
            <h2 className="mb-4 font-bold text-5xl text-[#F5F5F5]">
              Welcome Back,
              <br />
              Let&apos;s Continue
            </h2>

            {/* Carousel dots */}
            <div className="mt-12 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1 w-8 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-[#F5F5F5]"
                      : "bg-[#F5F5F5]/30 hover:bg-[#F5F5F5]/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 font-bold text-4xl text-[#F5F5F5]">
              Sign in to your account
            </h1>
            <p className="text-[#A1A1AA]">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#F5F5F5] underline-offset-4 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-white/6 bg-[#0B0B0F] text-[#F5F5F5] placeholder:text-[#A1A1AA] focus:border-[#6366F1] focus:ring-[#6366F1]/20"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 border-white/6 bg-[#0B0B0F] pr-12 text-[#F5F5F5] placeholder:text-[#A1A1AA] focus:border-[#6366F1] focus:ring-[#6366F1]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#A1A1AA] hover:text-[#F5F5F5]"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/6 bg-[#0B0B0F] text-[#6366F1] focus:ring-[#6366F1]"
                />
                <label htmlFor="remember" className="text-sm text-[#A1A1AA]">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#F5F5F5] underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-lg bg-[#6366F1] font-medium text-white transition-all hover:bg-[#5558E3] hover:shadow-xl hover:shadow-[#6366F1]/20 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/6" />
            <span className="text-sm text-[#A1A1AA]">Or sign in with</span>
            <div className="h-px flex-1 bg-white/6" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading}
              className="h-12 border border-white/60 bg-transparent text-[#F5F5F5] hover:bg-white hover:text-black"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isLoading}
              className="h-12 border border-white/60 bg-transparent text-[#F5F5F5] hover:bg-white hover:text-black"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
