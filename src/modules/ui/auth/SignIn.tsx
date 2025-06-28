"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


// Schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {

  const [pending,setPending]= useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter()

  const onSubmit = (data: LoginFormData) => {
    setPending(true)
    authClient.signIn.email({
      email: data.email,
      password: data.password,
    },
    {
      onSuccess:()=>{
        setPending(false)
          router.push('/')
      },
      onError:(error)=>{
         setPending(false)
        toast.error(error.error.message)
      }
    }
  )
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Login to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button disabled={pending} type="submit" className={`w-full ${pending?"bg-gray-600":""} `}>
              Sign in
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-sm text-gray-400">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="flex space-x-4 mx-auto">
            <Button disabled={pending} variant="outline" className="w-[50%]">
              <FaGoogle />
            </Button>
            <Button disabled={pending} variant="outline" className="w-[50%]">
              <FaGithub />
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-black underline">
              Sign up
            </Link>
          </p>

          <p className="text-xs text-center text-gray-400 mt-4">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Right - Branding */}
        <div className="w-full hidden md:w-1/2 bg-green-700 text-white md:flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🌀</div>
            <h2 className="text-2xl font-bold">Meet.AI</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
