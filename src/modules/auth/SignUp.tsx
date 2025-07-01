
"use client";

import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the form data type from the schema
type SignUpFormData = z.infer<typeof formSchema>;

export default function SignUp() {


  const [pending,setPending]= useState(false);

   
      const router = useRouter()
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = (data: SignUpFormData) => {
    setPending(true)
    authClient.signUp.email({
      email: data.email,
      name: data.name,
      password:data.password
    },
    {
      onSuccess:()=>{
        setPending(false)
        router.push("/")
      },
      onError:(err)=>{
        toast.error(err.error.message)
      }
    }
  );
  };
   const onSocial = (social: "google" | "github" ) => {
      setPending(true)
      authClient.signIn.social({
        provider:social,
        callbackURL:"/"
      },
      {
        onSuccess:()=>{
          setPending(false)
           
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
          <h2 className="text-2xl font-bold mb-2">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                autoComplete="off"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              disabled={pending}
              type="submit"
              className={`w-full ${pending ? "bg-gray-600" : ""} `}
            >
              Sign up
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-sm text-gray-400">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="flex space-x-4 mx-auto">
            <Button
              onClick={() => onSocial("google")}
              disabled={pending}
              variant="outline"
              className="w-[50%]"
            >
              <FaGoogle />
            </Button>
            <Button
              onClick={() => onSocial("github")}
              disabled={pending}
              variant="outline"
              className="w-[50%]"
            >
              <FaGithub />
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-black underline">
              Sign in
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
        <div className="w-full hidden md:w-1/2 bg-radial from-sidebar-accent to-sidebar text-white md:flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🌀</div>
            <h2 className="text-2xl font-bold">Meet.AI</h2>
          </div>
        </div>
      </div>
    </div>
  );
}


