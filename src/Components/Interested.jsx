import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Interested = ({ interests, setInterests, crop }) => {
  const axiosSecure = useAxiosSecure();

  // Update interest status
  const handleStatusUpdate = async (buyerEmail, status) => {
    try {
      const res = await axiosSecure.patch(`/crops/${crop._id}/interests`, {
        buyerEmail,
        status,
      });

      toast.success(`Interest ${status} successfully!`);
      // Update the state locally
      setInterests((prev) =>
        prev.map((item) =>
          item.buyerEmail === buyerEmail ? { ...item, status } : item
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (!Array.isArray(interests) || interests.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No interested buyers yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {interests.map((single, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Buyer: {single.buyerName || "Unknown"}
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Quantity:</span>{" "}
            {single.quantity || "N/A"}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Message:</span>{" "}
            {single.message || "No message"}
          </p>

          {/*  Status Badge */}
          <div className="mt-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                single.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : single.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {single.status || "Pending"}
            </span>
          </div>

          {/* Buttons only visible if Pending */}
          {single.status === "pending" && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleStatusUpdate(single.buyerEmail, "accepted")}
                className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(single.buyerEmail, "rejected")}
                className="flex-1 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Interested;
