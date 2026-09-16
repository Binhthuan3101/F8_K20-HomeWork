export const DefaultLayout = (contentHTML, currentPath) => {
  const isProductsActive = currentPath.startsWith('/products');
  
  return `
    <header class="bg-black text-white shadow-md sticky top-0 z-50 border-b border-white">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" data-link class="text-2xl font-bold text-indigo-400">VanillaShop</a>
        <nav class="flex gap-6">
          <a href="/" data-link class="hover:text-indigo-400 text-md font-medium ${currentPath === '/' ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}">Home</a>
          <a href="/products" data-link class="hover:text-indigo-400 text-md font-medium ${isProductsActive ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}">Products</a>
          <a href="/cart" data-link class="hover:text-indigo-400 text-md font-medium ${currentPath === '/cart' ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}">Cart</a>
          <a href="/sign-in" data-link class="hover:text-indigo-400 text-md font-medium ${currentPath === '/sign-in' ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}">Sign In</a>
          <a href="/sign-up" data-link class="hover:text-indigo-400 text-md font-medium ${currentPath === '/sign-up' ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}">Sign Up</a>
        </nav>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-140px)]">
      ${contentHTML}
    </main>
    <footer class="bg-slate-900 border-t py-4 text-center text-sm text-gray-600">
      © 2026 Vanilla Shop. All rights reserved.
    </footer>
  `;
};