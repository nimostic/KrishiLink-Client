import React, { useEffect, useState } from "react";

const EditModal = ({
  isModalOpen,
  setIsModalOpen,
  editingCrop,
  handleSaveEdit,
}) => {
  const [formData, setFormData] = useState({});
  // console.log(editingCrop);
  useEffect(() => {
    if (editingCrop) {
      setFormData(editingCrop);
    } else {
      setFormData({});
    }
  }, [editingCrop]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    handleSaveEdit(formData);
  };

  // Fallback image URL
  const fallbackImage =
    "https://media.istockphoto.com/id/965148388/photo/green-ripening-soybean-field-agricultural-landscape.jpg?s=612x612&w=0&k=20&c=cEVP3uj34-5obt-Jf_WI3O9qfP6tVrFaQIv1rBvvpzc=";

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Modal Container: Responsive and Scrollable */}
      <div
        className="bg-white border border-green-300 p-6 rounded-2xl shadow-2xl 
                      w-full max-w-md flex flex-col max-h-[90vh] relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl text-center font-bold mb-4 text-green-700">
          Edit Crop Details
        </h2>

        {/* Scrollable Form Content */}
        <div className="grow overflow-y-auto pr-2">
          {/* Image Preview */}
          <div className="flex justify-center mb-4">
            <img
              src={formData.imageURL || fallbackImage}
              alt="Crop"
              className="w-24 h-24 rounded-full object-cover border-2 border-green-400"
            />
          </div>

          {/* Form Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="text"
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              placeholder="Type"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit || ""}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="text"
              name="unit"
              value={formData.unit || ""}
              onChange={handleChange}
              placeholder="Unit (e.g., kg, piece)"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity || ""}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {/* Image URL Input */}
            <input
              type="text" // Changed back to 'text'
              name="imageURL"
              value={formData.imageURL || ""}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons (Footer) */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
