"use client";

import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { registerByPassword } from "@/src/features/auth/apis/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(1, "Họ và tên không được để trống"),
    email: z.string().min(1, "Email không được để trống").email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      await registerByPassword({
        fullname: data.name,
        email: data.email,
        password: data.password,
      });

      router.push("/login");
    } catch (error) {
      alert("Đăng ký thất bại");
      console.log("error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray">
      <div className="shadow-md w-full max-w-[424px] pb-8 border border-gray-100 rounded-xs">
        <div className="flex">
          <button
            type="button"
            className="flex-1 text-center py-4 border-b-[3px] border-white"
            onClick={() => router.push("/login")}
          >
            <span className="text-body-xl-600">Đăng nhập</span>
          </button>

          <div className="flex-1 text-center py-4 border-b-[3px] border-primary-500">
            <span className="text-body-xl-600 text-gray-500">Đăng ký</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="px-8 mt-6 space-y-4" noValidate>
          <div>
            <label className="text-body-small-400">Họ và tên</label>
            <input {...register("name")} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
            {errors.name && <p className="mt-1 text-body-small-400 text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-body-small-400">Địa chỉ email</label>
            <input {...register("email")} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
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

          <div>
            <label className="text-body-small-400">Xác nhận mật khẩu</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-body-small-400 text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" {...register("agree")} className="hidden" />
              <span className="p-[3px] self-start bg-primary-500 rounded-xs">
                <Check />
              </span>
              <span className="text-gray-700">Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật của Clicon.</span>
            </label>
            {errors.agree && <p className="mt-1 text-body-small-400 text-red-500">{errors.agree.message}</p>}
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs disabled:opacity-60"
          >
            <span className="text-heading-7 text-gray">{isSubmitting ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}</span>
            <ArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
