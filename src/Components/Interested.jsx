import Loading from "./Loading";

const Interested = ({ interests, crop, setInterests }) => {
  console.log(interests);

  if (!interests || interests.length === 0) {
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
          className="bg-white shadow-lg rounded-xl border border-gray-200 p-5 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Buyer: {single.buyerName}
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Quantity:</span> {single.quantity}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Message:</span> {single.message}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`font-semibold ${
                single.status === "Accepted"
                  ? "text-green-600"
                  : single.status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {single.status}
            </span>
          </p>
          <div className="flex gap-3 flex-wrap">
            <button className="flex-1 btn btn-success hover:bg-green-700 transition-colors">
              Accept
            </button>
            <button className="flex-1 btn btn-error hover:bg-red-700 transition-colors">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Interested;
