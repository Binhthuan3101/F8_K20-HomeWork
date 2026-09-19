import { useReducer, useState } from "react";

const initialState = {
  count: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + Number(action.payload),
      };
    case "reset":
      return { count: 0 };
    case "decrement":
      return { ...state, count: state.count - Number(action.payload) };
    default:
      throw new Error("Invalid action type");
  }
};
export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("0");
  return (
    <div>
      <p className=" text-lg font-bold">{state.count}</p>
      <div className="flex gap-5">
        <button
          className="px-5 py-1 bg-indigo-400 rounded-xl"
          onClick={() => dispatch({ type: "decrement" })}
        >
          -
        </button>
        <button
          className="px-5 py-1 bg-indigo-400 rounded-xl"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
        <button
          className="px-5 py-1 bg-indigo-400 rounded-xl"
          onClick={() => dispatch({ type: "increment" })}
        >
          +
        </button>
      </div>
      <div className="mt-2 flex gap-5">
        <button
          className="px-5 py-1 rounded-xl bg-purple-500"
          onClick={() => dispatch({ type: "increment", payload: value })}
        >
          Add
        </button>
        <input
          type="text"
          className="border rounded-xl border-gray-400"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter") {
                  dispatch({ type: "increment", payload: value })
                  setValue("0");
            }
          }}
          placeholder="Enter a value"
          name=""
          id=""
        />
      </div>
    </div>
  );
}
