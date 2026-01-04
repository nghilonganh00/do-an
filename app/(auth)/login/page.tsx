"use client";

import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { login } from "@/src/features/auth/apis/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email không được để trống").email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("accessToken", response.accessToken);

      router.push("/");
    } catch (error) {
      alert("Email hoặc mật khẩu không đúng");
      console.log("error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray">
      <div className="shadow-md w-full max-w-[424px] pb-8 border border-gray-100 rounded-xs">
        <div className="flex">
          <button className="flex-1 text-center py-4 border-b-[3px] border-primary-500">
            <span className="text-body-xl-600">Đăng nhập</span>
          </button>

          <button
            type="button"
            className="flex-1 text-center py-4 border-b-[3px] border-white"
            onClick={() => router.push("/register")}
          >
            <span className="text-body-xl-600 text-gray-500">Đăng ký</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="px-8 mt-6 space-y-4" noValidate>
          <div>
            <label className="text-body-small-400">Địa chỉ email</label>
            <input
              {...register("email")}
              className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
              placeholder="example@email.com"
            />
            {errors.email && <p className="mt-1 text-body-small-400 text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-body-small-400">Mật khẩu</label>
            <input
              type="password"
              {...register("password")}
              className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
            />
            {errors.password && <p className="mt-1 text-body-small-400 text-red-500">{errors.password.message}</p>}
          </div>

          <button type="button" className="text-body-small-500 text-secondary-500">
            Quên mật khẩu?
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs disabled:opacity-60"
          >
            <span className="text-heading-7 text-gray">{isSubmitting ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}</span>
            <ArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
