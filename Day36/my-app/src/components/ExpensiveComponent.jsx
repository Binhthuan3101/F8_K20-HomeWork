import { useCallback, useMemo, useState } from "react";
import ChildComponent from "./ChildComponent";
import useCount from "../hooks/useCount";

export default function ExpensiveComponent({ name }) {
  const { count, handleCount } = useCount();
  const result = useCallback(() => {
    console.log(count);
  }, [count]);
  return (
    <div>
      <div>{count}</div>
      <button onClick={handleCount}>Tăng count</button>
      <ChildComponent count={count} result={result} />
    </div>
  );
}
