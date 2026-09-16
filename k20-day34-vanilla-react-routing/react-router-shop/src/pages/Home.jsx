import { Link } from "react-router";

export default function Home() {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        Chào mừng đến với ReactShop
      </h1>
      <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-8">
        Trải nghiệm ứng dụng Single Page App cực mượt với React Router.
      </p>
      <Link
        to="/products"
        className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Khám phá sản phẩm
      </Link>
    </section>
  );
}
