import Image from "next/image";


export default function Home() {
  return (
    <div>
      <h1>hello</h1>
      <div>
        <Image alt="image" src="/image.png" width={200} height={200}/>
      </div>
    </div>
  );
}
