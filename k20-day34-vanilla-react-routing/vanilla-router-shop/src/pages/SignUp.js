export const SignUp = () => `
  <h2 class="text-2xl font-bold text-white text-center mb-6">Đăng ký tài khoản</h2>
  <form autocomplete="off" onsubmit="event.preventDefault(); alert('Đăng ký thành công!');" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
      <input type="text" required class="w-full border rounded-lg px-3 py-2 outline-none text-white focus:ring-2 focus:ring-indigo-500" placeholder="Nguyễn Văn A">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input type="email" required class="w-full border rounded-lg px-3 py-2 outline-none text-white focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
      <input type="password" required class="w-full border rounded-lg px-3 py-2 outline-none text-white focus:ring-2 focus:ring-indigo-500" placeholder="password">
    </div>
    <button type="submit" class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">Đăng ký</button>
  </form>
`;