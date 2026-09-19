import { useReducer, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import Counter from "./components/Counter";
import Component1 from "./components/component1";
import Component2 from "./components/component2";
import { createContext } from "react";

export const messageContext = createContext(null);
const initialState = {
  message: "Hello from App",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setMessage":
      return {
        ...state,
        message: action.payload,
      };
    default:
      throw new Error("Invalid action type")
  }
};
function App() {
  const [count, setCount] = useState(0);
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <h1>Hello F8</h1>
      <Counter />
      <messageContext.Provider value={{store,dispatch}}>
        <Component1 />
        <Component2 />
      </messageContext.Provider>
    </>
  );
}

export default App;
