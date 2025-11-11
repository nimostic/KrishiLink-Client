import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Card from "./Card";
import Loading from "./Loading";
import { toast } from "react-toastify";

const LatestCrops = () => {
  const axiosSecure = useAxiosSecure();
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosSecure.get("/latest-crops").then((data) => {
      // console.log(data.data);
      setLoading(false);
      setLatest(data.data);
    });
  }, [latest,axiosSecure]);
  if (loading) {
    return <Loading></Loading>;
  }


  const handleDelete = (id) => {
    axiosSecure.delete(`/delete/${id}`).then((res) => {
      console.log(res);
      toast.warning("Successfully deleted!!!");
      setLatest((prev) => prev.filter((crop) => crop._id !== id));
    });
  };
  return (
    <>
      <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center p-5">
        {latest.map((singleCrop) => (
          <Card singleCrop={singleCrop} handleDelete={handleDelete} key={singleCrop._id} />
        ))}
      </div>
    </>
  );
};

export default LatestCrops;
