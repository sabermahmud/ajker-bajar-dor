import Image from "next/image";
import { BsListNested } from "react-icons/bs";

interface NavDataTypes {
  nameBn: string;
}

const navDataPromise = async (): Promise<NavDataTypes[]> => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch economy news");
  }
  return res.json();
};

export default async function Navbar() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date().toLocaleDateString("bn", options);

  const navData = await navDataPromise();
  console.log(navData);

  return (
    <>
      <div className="flex justify-between items-center ">
        {/* logo */}
        <div className="flex items-center">
          <Image src={"/logo.png"} alt="nav-logo" height={100} width={100} />
          <div>
            <h1 className="text-xl font-bold">বাজার দর</h1>
            <p>{date}</p>
          </div>
        </div>
        {/* btns */}
        <div className="flex gap-4">
          <button className="btn btn-primary">সাইন ইন</button>
          <button className="btn btn-success">সাইন আপ</button>
        </div>
      </div>
    </>
  );
}
