import React from "react";
import { Link } from "react-router";


// Helper function for date formatting
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CropTable = ({ crops, handleDelete, handleEdit, user }) => {
  if (crops.length === 0) {
    return null; 
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price/Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Posted Date</th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {crops.map((crop) => {
              const isOwner = crop.owner?.ownerEmail === user?.email;
              return (
                <tr key={crop._id} className="hover:bg-green-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link to={`/crops/${crop._id}`} className="text-green-600 hover:text-green-800 font-semibold">
                          {crop.name || "-"}
                      </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.type || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.pricePerUnit ? `$${crop.pricePerUnit}` : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.quantity || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.owner?.ownerName || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(crop.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {isOwner ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(crop._id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-150"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(crop._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-150"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    
    </div>
  );
};

export default CropTable;