import Image from "next/image";
import AllProductsPage from "./allProducts/page";
import CurrentDate from "./Components/CurrentDate";
import { Suspense } from "react";
import Link from "next/link";




export default async function Home() {

  return (
    <>
      <div className="bg-white my-6 flex flex-col lg:flex-row justify-between">
         <div>
          <p>
            <Suspense fallback={<div>Loading...</div>}>
              <CurrentDate/>
            </Suspense>
          </p>
          <h2>আজকের বাজারের দাম এক নজরে</h2>
          <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
          <Link href={"#allProducts"}>
              <button className="btn btn-success">সব পণ্য দেখুন</button>
          </Link>
         </div>
         <div>
          <Image src={"/logo.png"} alt="logo" width={400} height={400}/>
         </div>
      </div>
      {/* সব পণ্য */}
      <div id="allProducts">
        <AllProductsPage/>
      </div>
    </>
  );
}
