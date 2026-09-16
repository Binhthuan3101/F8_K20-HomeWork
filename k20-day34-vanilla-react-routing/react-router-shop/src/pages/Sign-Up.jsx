import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đăng ký thành công!");
    navigate("/sign-in");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        Đăng ký tài khoản
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            required
            className="w-full border bg-black text-white placeholder:text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-700 autofill:shadow-[inset_0_0_0_1000px_#000000] autofill:text-white"
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full border bg-black text-white placeholder:text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-700 autofill:shadow-[inset_0_0_0_1000px_#000000] autofill:text-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            autoComplete="new-password"
            required
            className="w-full border bg-black text-white placeholder:text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-700 autofill:shadow-[inset_0_0_0_1000px_#000000] autofill:text-white"
            placeholder="password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Đăng ký
        </button>
      </form>
    </>
  );
}
