import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import Card from "../Components/Card";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [loading, setloading] = useState(false);
  const [crops, setCrops] = useState([]);
  console.log(user);

  const handleDelete = (id) => {
    axiosSecure.delete(`/delete/${id}`).then((res) => {
      console.log(res);
      toast.warning("Successfully deleted!!!");
      setCrops(prev => prev.filter(crop => crop._id !== id));
    });
  };



  useEffect(() => {
    axiosSecure.get(`/my-posts?email=${user?.email}`).then((result) => {
      // console.log(result.data);
      setloading(false);
      setCrops(result.data);
    });
  }, [user, setCrops, axiosSecure]);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : crops.length === 0 ? (
        <div>You haven't created Post....</div>
      ) : (
        <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center p-5">
          {crops.map((singleCrop) => (
            <Card singleCrop={singleCrop} handleDelete={handleDelete} key={singleCrop._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
