import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Components/Loading";
import { Link } from "react-router";

const MyInterest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [totalCropsInterested, setTotalCropsInterested] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/my-interests/${user.email}`).then((res) => {
      console.log(res.data);
      setTotalCropsInterested(res.data);
      setLoading(false);
      
    });
  }, [axiosSecure, user?.email]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[#E9FDF0] min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        {" "}
        My Interests ({totalCropsInterested.length})
      </h2>
      {totalCropsInterested.length === 0 ? (
        <p className="text-center text-gray-600">
          You have 0 interested items.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="container mx-auto bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-[#00C951] text-white text-sm sm:text-base">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Crop Name</th>
                <th className="py-3 px-4 text-left">Owner</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {totalCropsInterested.map((singleCrop, index) => {
                // const myInterest = singleCrop.interests[0];
                const myInterest = singleCrop.interests.find(
                  (interest) => interest.buyerEmail === user.email
                );
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-green-50 transition text-gray-700"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td>
                      <Link
                        to={`/crops/${singleCrop._id}`}
                        className="text-green-600 hover:text-green-800 font-semibold"
                      >
                        {singleCrop.name || "-"}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      {singleCrop.owner?.ownerName || "Unknown"}
                    </td>
                    <td className="py-3 px-4">{myInterest?.quantity}</td>
                    <td className="py-3 px-4">
                      {myInterest?.message || "No message"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          myInterest?.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : myInterest?.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {myInterest?.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyInterest;
