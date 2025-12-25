"use client";

import { ArrowRight } from "@/src/components/icons/ArrowRight";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray">
      <div className="shadow-md w-full max-w-[424px] pb-8 border border-gray-100 rounded-xs">
        <div className="flex">
          <button className="flex-1 text-center py-4 border-b-[3px] border-primary-500">
            <span className="text-body-xl-600">Đăng nhập</span>
          </button>

          <button
            className="flex-1 text-center py-4 border-b-[3px] border-white"
            onClick={() => router.push("/register")}
          >
            <span className="text-body-xl-600 text-gray-500">Đăng ký</span>
          </button>
        </div>

        <div className="px-8 mt-6">
          <label className="text-body-small-400">Địa chỉ email</label>
          <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label className="text-body-small-400">Mật khẩu</label>
              <button className="text-body-small-500 text-secondary-500 hover:cursor-pointer">Quên mật khẩu?</button>
            </div>
            <input type="password" className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
          </div>

          <button className="w-full h-12 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs">
            <span className="text-heading-7 text-gray">ĐĂNG NHẬP</span>
            <ArrowRight />
          </button>

          <button
            type="button"
            className="w-full relative flex items-center justify-center mt-3 px-4 py-3 border border-gray-100 rounded-xs"
          >
            <Image
              src="/assets/images/google.png"
              alt="Biểu tượng Google"
              width={20}
              height={20}
              className="absolute left-4"
            />
            <span className="text-body-small-400 text-gray-700">Đăng nhập bằng Google</span>
          </button>

          <button
            type="button"
            className="w-full relative flex items-center justify-center mt-3 px-4 py-3 border border-gray-100 rounded-xs"
          >
            <Image
              src="/assets/images/apple.png"
              alt="Biểu tượng Apple"
              width={20}
              height={20}
              className="absolute left-4"
            />
            <span className="text-body-small-400 text-gray-700">Đăng nhập bằng Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}
