import React from "react";

const events = [
  {
    title: "Organic Farming Workshop",
    date: "2025-12-20",
    location: "Dhaka",
  },
  {
    title: "Seasonal Crop Market",
    date: "2025-12-28",
    location: "Chittagong",
  },
  {
    title: "AgroTech Expo",
    date: "2026-01-10",
    location: "Rajshahi",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="bg-[#E9FDF0] pb-8 ">
        <div className="px-4 container mx-auto md:px-16 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 border bg-white border-green-400 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-1">Date: {event.date}</p>
            <p className="text-gray-600">Location: {event.location}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UpcomingEvents;
