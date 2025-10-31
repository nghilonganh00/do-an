"use client";

import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { Check } from "@/src/components/icons/Check";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray">
      <div className="shadow-md w-full max-w-[424px] pb-8 border border-gray-100 rounded-xs">
        <div className="flex">
          <button className="flex-1 text-center py-4 border-b-[3px] border-white" onClick={() => router.push("/login")}>
            <span className="text-body-xl-600">Sign In</span>
          </button>

          <div className="flex-1 text-center py-4 border-b-[3px] border-primary-500">
            <span className="text-body-xl-600 text-gray-500">Sign Up</span>
          </div>
        </div>

        <div className="px-8 mt-6 space-y-4">
          <div>
            <label className="text-body-small-400">Name</label>
            <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
          </div>

          <div>
            <label className="text-body-small-400">Email address</label>
            <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
          </div>

          <div className="">
            <div className="flex items-center justify-between">
              <label className="text-body-small-400">Password</label>
            </div>
            <input type="password" className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
          </div>

          <div className="">
            <div className="flex items-center justify-between">
              <label className="text-body-small-400">Confirm Password</label>
            </div>
            <input type="password" className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
          </div>

          <div className="flex items-start gap-2">
            <button className="p-[3px] self-start bg-primary-500 rounded-xs">
              <Check />
            </button>

            <span className="text-gray-700">Are you agree to Clicon Terms of Condition and Privacy Policy.</span>
          </div>

          <button className="w-full h-12 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs">
            <span className="text-heading-7 text-gray">SIGN UP</span>
            <ArrowRight />
          </button>

          <button
            type="button"
            className="w-full relative flex items-center justify-center mt-3 px-4 py-3 border border-gray-100 rounded-xs"
          >
            <Image
              src="/assets/images/google.png"
              alt="Google Icon"
              width={20}
              height={20}
              className="absolute left-4"
            />
            <span className="text-body-small-400 text-gray-700">Sign up with Google</span>
          </button>

          <button
            type="button"
            className="w-full relative flex items-center justify-center mt-3 px-4 py-3 border border-gray-100 rounded-xs"
          >
            <Image
              src="/assets/images/apple.png"
              alt="Google Icon"
              width={20}
              height={20}
              className="absolute left-4"
            />
            <span className="text-body-small-400 text-gray-700">Sign up with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}
