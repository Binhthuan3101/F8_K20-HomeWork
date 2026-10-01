import { lazy, Suspense, useState } from "react";
// import Child from "./components/Child";

const Child = lazy(() => import("./components/Child"));
function App() {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div>Hello f8</div>
      <button onClick={() => setIsShow(!isShow)}>Toggle show</button>
      {isShow && (
        <Suspense fallback={ <p>Đang tải dữ liệu...</p>}>
          <Child/>
        </Suspense>
      )}
    </>
  );
}

export default App;
