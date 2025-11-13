import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Components/Loading";
import Swal from "sweetalert2";
import EditModal from "../Pages/EditModal";
import { toast } from "react-toastify";
import CropTable from "../Components/CropTable"; 


const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [loading, setloading] = useState(true);
  const [crops, setCrops] = useState([]);

  // edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);

  useEffect(() => {
    setloading(true);
    // Fetch posts created by the current user
    axiosSecure.get(`/my-posts?email=${user?.email}`)
      .then((result) => {
        setCrops(result.data);
      })
      .catch(error => {
        console.error("Error fetching my posts:", error);
        toast.error("Failed to load your posts.");
      })
      .finally(() => {
        setloading(false);
      });
  }, [user, axiosSecure]);

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
              text: "Your crop post has been deleted.",
              icon: "success",
            });
            // Update the state to remove the deleted crop
            setCrops((prev) => prev.filter((crop) => crop._id !== id));
          }
        })
        .catch(error => {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete the post.");
        });
      }
    });
  };

  const handleEdit = (id) => {
    const selected = crops.find((crop) => crop._id === id);
    setEditingCrop(selected);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedCrop) => {
    axiosSecure.patch(`/edit/${updatedCrop._id}`, updatedCrop)
      .then(res => {
        if (res.data.modifiedCount > 0) {
            setIsModalOpen(false);
            toast.success("Crop updated successfully!");
            // Update the state with the new crop data
            setCrops((prev) =>
              prev.map((crop) =>
                crop._id === updatedCrop._id ? { ...crop, ...updatedCrop } : crop
              )
            );
        } else {
            toast.info("No changes were made or update failed.");
        }
      })
      .catch(error => {
        console.error("Error updating post:", error);
        toast.error("Failed to update the post.");
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
   <div className="bg-[#E9FDF0] min-h-screen">
     <div className="w-full container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">My Posts({crops.length})</h2>
      
      {crops.length === 0 ? (
        <div className="text-center p-10 text-xl font-medium text-gray-600">
          You haven't created any posts yet.
        </div>
      ) : (
        <CropTable
          crops={crops}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          user={user} 
        />
      )}

      <EditModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingCrop={editingCrop}
        handleSaveEdit={handleSaveEdit}
      />
    </div>
   </div>
  );
};

export default MyPosts;