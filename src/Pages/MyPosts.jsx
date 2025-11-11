import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import { span } from "framer-motion/client";
import Card from "../Components/Card";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = use(AuthContext);

  const [crops, setCrops] = useState([]);
  console.log(user);

  useEffect(() => {
    axiosSecure.get(`/my-posts?email=${user?.email}`).then((result) => {
      console.log(result.data);
      setCrops(result.data);
    });
  }, [user, setCrops, axiosSecure]);

  if (loading) {
    return <span className="spinner"></span>;
  }
  return (
    <div>
      <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center p-5">
        {crops.map((singleCrop) => (
          <Card singleCrop={singleCrop} key={singleCrop._id} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
