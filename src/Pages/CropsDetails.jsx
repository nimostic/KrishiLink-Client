import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Components/Loading";
import Interested from "../Components/Interested";

const CropDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState([]);
  const [formData, setFormData] = useState({ quantity: "", message: "" });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 600, once: true });
  }, []);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await axiosSecure.get(`/crops/${id}`);
        setCrop(res.data);
        setInterests(res.data.interests || []);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load crop details");
        setLoading(false);
      }
    };
    fetchCrop();
  }, [id, axiosSecure]);

  if (loading) return <Loading />;
  if (!crop) return <div className="text-center py-10">Crop not found</div>;

  const isOwner = user?.email === crop?.owner?.ownerEmail;

  const totalPrice =
    formData.quantity && crop?.pricePerUnit
      ? formData.quantity * crop.pricePerUnit
      : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.quantity < 1) {
      toast.error("Quantity must be at least 1!");
      return;
    }
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    const interestData = {
      cropId: crop._id,
      cropName: crop.name,
      buyerEmail: user.email,
      buyerName: user.displayName,
      quantity: formData.quantity,
      message: formData.message,
      status: "pending",
      totalPrice,
    };

    try {
      await axiosSecure.post("/interests", interestData);
      toast.success("Interest sent successfully!");

      // Update local interests so owner sees it
      setInterests((prev) => [...prev, interestData]);

      setShowConfirm(false);
      setFormData({ quantity: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setShowConfirm(false);
    }
  };

  return (
    <div
      data-aos="fade-zoom-in"
      className="min-h-screen bg-linear-to-b from-green-50 to-green-100 text-gray-800 p-6 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Crop Info Section */}
        <div className="relative">
          <img
            src={crop.imageURL}
            alt={crop.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
          <h1 className="absolute bottom-4 left-6 text-3xl font-bold text-white">
            {crop.name}
          </h1>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Crop Details
          </h2>
          <p className="text-gray-600 mb-1">
            <strong>Category:</strong> {crop.type}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Price per unit:</strong> ${crop.pricePerUnit}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Location:</strong> {crop.location}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Description:</strong> {crop.description}
          </p>
        </div>

        {/* Interest Form (only for non-owner users) */}
        {!isOwner && (
          <div className="p-6 border-t border-gray-200 bg-green-50">
            <h2 className="text-lg font-semibold text-green-700 mb-4">
              Send Interest Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="input input-bordered w-full border-green-300 focus:border-green-500"
              />
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Add a message (optional)"
                className="input input-bordered w-full border-green-300 focus:border-green-500"
              />
              <p className="text-sm text-gray-600">
                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
              </p>
              <button
                type="submit"
                className="btn bg-green-600 text-white hover:bg-green-700 w-full"
              >
                Submit Interest
              </button>
            </form>
          </div>
        )}

        {/* Owner section */}
        {isOwner && (
          <div className="p-6 border-t border-gray-200 bg-green-50">
            <h2 className="text-lg font-semibold text-green-700 mb-3">
              Received Interests
            </h2>
            <p className="text-gray-500 mb-3">
              <strong>Total Interested: {interests.length}</strong>
            </p>
            <Interested interests={interests}  setInterests={setInterests} crop={crop} />
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-3">
              Confirm Interest Request?
            </h3>
            <p className="text-gray-600 mb-5">
              You are about to send interest for <b>{crop.name}</b> worth $
              {totalPrice.toFixed(2)}.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="btn bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDetails;
