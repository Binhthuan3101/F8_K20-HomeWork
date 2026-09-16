import { DefaultLayout } from "../layouts/DefaultLayout";
import { Products } from "../pages/Products";
import { Home } from "../pages/Home";
import { ProductsDetail } from "../pages/ProductDetail";
import { Cart } from "../pages/Cart";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";
import { AuthLayout } from "../layouts/AuthLayout";

const routes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/products", component: Products, layout: DefaultLayout },
  { path: "/products/:id", component: ProductsDetail, layout: DefaultLayout },
  { path: "/cart", component: Cart, layout: DefaultLayout },
  { path: "/sign-in", component: SignIn, layout: AuthLayout },
  { path: "/sign-up", component: SignUp, layout: AuthLayout },
];

function mathRoute(routePath, currentPath) {
  const routeParts = routePath.split("/").filter(Boolean);
  const currentParts = currentPath.split("/").filter(Boolean);

  if (routeParts.length !== currentParts.length) return null;
  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const currentPart = currentParts[i];
    if (routePart.startsWith(":")) {
      const paramName = routePart.slice(1);
      params[paramName] = currentPart;
    } else if (routePart !== currentPart) {
      return null;
    }
  }
  return params;
}

export const router = () => {
  const pathname = location.pathname;
  let matchedParams = null;

  const currentRoute = routes.find((route) => {
    const params = mathRoute(route.path, pathname);
    if (params !== null) {
      matchedParams = params;
      return true;
    }
    return false;
  });
  if (!currentRoute) {
    const content = NotFound();
    document.querySelector("#app").innerHTML = DefaultLayout(content, pathname);
  } else {
    const content = currentRoute.component(matchedParams);
    document.querySelector("#app").innerHTML = currentRoute.layout(
      content,
      pathname,
    );
  }
  window.scrollTo(0, 0);
};
export const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};
