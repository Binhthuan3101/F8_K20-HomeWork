import { useContext } from "react";
import { messageContext } from "../App";

export default function Component2() {
  const {store,dispatch} = useContext(messageContext);
  const handleChangeMessage = () =>
    dispatch({ type: "setMessage", payload: "Hello f8" });
  return (
    <>
      <div>Component 2:{store.message}</div>
      <button onClick={handleChangeMessage}>Thay đổi thành Hello F8</button>
    </>
  );
}
