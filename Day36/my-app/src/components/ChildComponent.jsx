import { memo } from "react";

const ChildComponent = memo(function ChildComponent({result}) {
  console.log("Render Child Component");
  return <div>Child components</div>;
});

export default ChildComponent;
