import React, { Suspense } from "react";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch(
  "https://smart-deals-server-part2-swart.vercel.app/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <div>
      <h3 className="bg-primary">this is home</h3>
      <Suspense fallback="<p>loading...</p>">
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
