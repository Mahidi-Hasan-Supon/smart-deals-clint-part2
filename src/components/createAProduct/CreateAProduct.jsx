import React from "react";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

import { useAxiosSecure } from "../hooks/useAxiosSecuire";

const CreateAProduct = () => {
  const { user } = useAuth();
  //   const axiosInstance = useAxios()
  const axiosSecure = useAxiosSecure();

  const handleAProduct = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const min_price = e.target.min_price.value;
    const max_price = e.target.max_price.value;
    const newProduct = {
      name,
      image,
      min_price,
      max_price,
      email: user.email,
      seller_name: user.displayName,
    };
    axiosSecure.post("/products", newProduct).then((data) => {
      console.log("access success token", data.data);
    });
    // axiosInstance.post("/products", newProduct).then((data) => {
    //   console.log(data.data);
    // });

    //     axios.post("https://smart-deals-server-part2-swart.vercel.app/products", newProduct).then((data) => {
    //       console.log(data.data);
    //       if (data.data.insertedId) {
    //         Swal.fire({
    //           position: "top-end",
    //           icon: "success",
    //           title: "Your bid has been placed.",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       }
    //     });
  };
  return (
    <div className="max-w-1/2 mx-auto">
      <form onSubmit={handleAProduct}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" />
          {/* email */}
          <label className="label">image Url</label>
          <input type="text" className="input" name="image" />
          {/* bid amount */}
          <label className="label">min_price</label>
          <input
            type="text"
            name="min_price"
            className="input"
            placeholder="min_price"
          />
          <label className="label">max_price</label>
          <input
            type="text"
            name="max_price"
            className="input"
            placeholder="max_price"
          />
          <button className="btn btn-neutral mt-4">Add a product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateAProduct;
