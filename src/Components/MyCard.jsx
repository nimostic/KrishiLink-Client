import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthContext";



const MyCard = ({ singleCrop, handleDelete,handleEdit }) => {
  const createdUserMail = singleCrop.owner?.ownerEmail;
  const { user } = use(AuthContext);

  return (
    <div className="relative flex w-full max-w-sm flex-col rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Image / Gradient Header */}
      <div className="relative h-48 overflow-hidden rounded-t-xl bg-linear-to-r from-green-400 to-green-600">
        {singleCrop?.imageURL && (
          <img
            src={singleCrop.imageURL}
            alt={singleCrop.name}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h5 className="mb-2 text-xl font-semibold text-gray-800">
          {singleCrop?.name || "Crop Name"}
        </h5>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {singleCrop?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>
        <p className="text-sm font-medium text-green-600">
          {singleCrop?.type || "Vegetable"}
        </p>
        <p className="text-sm font-semibold text-gray-700 mt-1">
          Price:{" "}
          {singleCrop?.pricePerUnit ? `$${singleCrop.pricePerUnit}` : "-"}
        </p>
        <p className="text-sm font-semibold text-gray-700 mt-1">
          Quantity: {singleCrop?.quantity ? `${singleCrop.quantity}` : "-"}
        </p>
        <p className="text-sm font-semibold text-gray-700 mt-1">
          Owner Name:{" "}
          {singleCrop?.owner?.ownerName ? `${singleCrop.owner.ownerName}` : "-"}
        </p>
        <p className="text-sm font-semibold text-gray-700 mt-1">
          Posted date:{" "}
          {new Date(singleCrop?.createdAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Button */}
      <div className="p-6 pt-0">
        {createdUserMail === user?.email && (
          <div className="flex justify-evenly pb-2">
            <button onClick={()=>handleEdit(singleCrop._id)} className="btn bg-yellow-500 px-4 py-1 rounded text-white">Edit</button>
            <button
              onClick={() => handleDelete(singleCrop._id)}
              className="btn bg-red-500 px-4 py-1 rounded text-white"

            >
              Delete
            </button>
          </div>
        )}

        <Link to={`/crops/${singleCrop._id}`}>
          <button
            type="button"
            className="w-full rounded-lg bg-green-500 py-2 px-4 text-sm font-bold uppercase text-white shadow-md shadow-green-500/30 transition-all hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyCard;
