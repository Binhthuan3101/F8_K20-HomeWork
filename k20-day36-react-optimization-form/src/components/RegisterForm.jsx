import { promise, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email không được để trống" })
      .email({ message: "Email không đúng định dạng" }),
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải có tối thiểu 8 ký tự" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Mật khẩu để lại không được để trống" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    await new promise((resolve) => setTimeout(resolve, 2000));
    alert("Đăng ký thành công!");
    console.log("Dữ liệu gửi lên: ", data);
    reset();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Bài 2: Form đăng ký tài khoản
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Sử dụng{" "}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600 font-mono">
            React Hook Form
          </code>{" "}
          + <code className="">Zod</code>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="max-w-md mx-auto space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200 focus:border-blue-500"}`}
          />
          {errors.email && (
            <p className="text-xs mt-1 text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200 focus:border-blue-500"}`}
          />
          {errors.password && (
            <p className="text-xs mt-1 text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200 focus:border-blue-500"}`}
          />
          {errors.confirmPassword && (
            <p className="text-xs mt-1 text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm text-white transition-all shadow-sm ${
            isSubmitting
              ? "bg-slate-400 cursor-not-allowed opacity-80"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
          }`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Đang xử lý" : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}
