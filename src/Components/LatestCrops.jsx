import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Card from "./Card";

const LatestCrops = () => {
  const axiosSecure = useAxiosSecure();
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosSecure.get("/latest-crops").then((data) => {
      console.log(data.data);
      setLoading(false);
      setLatest(data.data);
    });
  }, []);
  if (loading) {
    return <span className="loading"></span>;
  }
  return (
    <>
      <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center p-5">
        {latest.map((singleCrop) => (
          <Card singleCrop={singleCrop} key={singleCrop._id} />
        ))}
      </div>
    </>
  );
};

export default LatestCrops;
