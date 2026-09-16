export const SignIn = () => `
  <h2 class="text-2xl font-bold text-white text-center block mb-6">Đăng nhập</h2>
  <form onsubmit="event.preventDefault(); alert('Đăng nhập thành công!');" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-300 mb-1">Email</label>
      <!-- ĐÃ SỬA: Thêm class placeholder:text-gray-500 -->
      <input type="email" required 
        class="w-full border text-white placeholder:text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-700 autofill:shadow-[inset_0_0_0_1000px_#000000] autofill:text-white" 
        placeholder="you@example.com">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-300 mb-1">Mật khẩu</label>
      <!-- ĐÃ SỬA: Thêm class placeholder:text-gray-500 -->
      <input type="password" required 
        class="w-full border text-white placeholder:text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-700 autofill:shadow-[inset_0_0_0_1000px_#000000] autofill:text-white" 
        placeholder="password">
    </div>
    <button type="submit" class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">Đăng nhập</button>
  </form>
`;
