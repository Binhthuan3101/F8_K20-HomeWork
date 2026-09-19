import { createContext, useContext, useReducer } from "react";
import { PRODUCTS } from "../data/Product";
const ShopContext = createContext();
const initialState = {
  products: PRODUCTS,
  cart: [],
  selectedCategory: "Tất cả",
  searchKey: "",
};

function ShopReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingIndex > -1) {
        const updateCart = [...state.cart];
        updateCart[existingIndex].quantity += 1;
        return { ...state, cart: updateCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      const { id, quantity } = action.payload;
      if (quantity < 1) return state;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(ShopReducer, initialState);
  const filteredProducts = state.products.filter((product) => {
    const matchCategory =
      state.selectedCategory === "Tất cả" ||
      product.category === state.selectedCategory;
    const matchKey = product.name
      .toLowerCase()
      .includes(state.searchKey.toLowerCase().trim());
    return matchCategory && matchKey;
  });

  const totalCartCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalCartPrice = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const value = {
    products: filteredProducts,
    allProducts: state.products,
    cart: state.cart,
    selectedCategory: state.selectedCategory,
    searchKey: state.searchKey,
    totalCartCount,
    totalCartPrice,
    dispatch,
    };
    
    return <ShopContext.Provider value={value}>{ children}</ShopContext.Provider>
}

export function useShop() {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShop phải được sử dụng trong ShopProvider")
    }
    return context;
}
