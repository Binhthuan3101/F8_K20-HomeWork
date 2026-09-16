export const AuthLayout = (contentHtml) => {
  return `
    <div class="min-h-screen bg-black flex flex-col justify-center items-center px-4">
        <div class="mb-2">
            <a href="/" data-link class="text-2xl font-bold text-indigo-600">Vanilla Shop</a>
        </div>
        <div class="w-full max-w-md bg-transparent px-8 py-3 rounded-xl shadow-md border border-transparent">
        ${contentHtml}
        </div>
        <a href="/" data-link class="mt-6 text-sm text-white hover:underline hover:text-indigo-600">Quay lại trang chủ</a>
    </div>
    `;
};
