import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Components/Loading";
import Card from "../Components/Card";

const MyInterest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  console.log(user);
  const [totalCropsInterested, setTotalCropsInterested] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosSecure.get(`/my-interests/${user.email}`).then((res) => {
      console.log(res.data);
      setTotalCropsInterested(res.data);
    setLoading(false)
    });
  }, [axiosSecure, user.email]);

  if (loading) {
    return <Loading></Loading>;
  }

  return <div className="bg-[#E9FDF0]">
        <h1 className="font-bold text-3xl text-center py-10"> Total: {totalCropsInterested.length}</h1>
       {
        totalCropsInterested.length === 0 ? "You have 0 interested item" :  <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center p-5">
          {totalCropsInterested.map((singleCrop) => (
            <Card singleCrop={singleCrop} key={singleCrop._id} />
          ))}
        </div>
       }
    
  </div>;
};

export default MyInterest;
