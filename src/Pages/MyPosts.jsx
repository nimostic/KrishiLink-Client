import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Components/Loading";
import MyCard from "../Components/MyCard";
import Swal from "sweetalert2";
import EditModal from "../Pages/EditModal";
import { toast } from "react-toastify";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [loading, setloading] = useState(false);
  const [crops, setCrops] = useState([]);
  console.log(crops);
  //edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);

  // console.log(user);
  useEffect(() => {
    axiosSecure.get(`/my-posts?email=${user?.email}`).then((result) => {
      // console.log(result.data);
      setloading(false);
      setCrops(result.data);
    });
  }, [user, setCrops, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setCrops((prev) => prev.filter((crop) => crop._id !== id));
          }
        });
      }
    });
  };

  const handleEdit = (id) => {
    console.log(id);
    const selected = crops.find((crop) => crop._id === id);
    setEditingCrop(selected);
    console.log(selected);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedCrop) => {
    console.log(updatedCrop);
    axiosSecure.patch(`/edit/${updatedCrop._id}`,updatedCrop)
    .then(res=> {
      console.log(res);
      setIsModalOpen(false);
      toast.success("updated success")

      setCrops((prev) =>
        prev.map((crop) =>
          crop._id === updatedCrop._id ? { ...crop, ...updatedCrop } : crop
        )
      )
    })
  };

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : crops.length === 0 ? (
        <div>You haven't created Post....</div>
      ) : (
        <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center p-5">
          {crops.map((singleCrop) => (
            <MyCard
              singleCrop={singleCrop}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              key={singleCrop._id}
            />
          ))}
        </div>
      )}

      <EditModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingCrop={editingCrop}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default MyPosts;
