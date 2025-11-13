import { FaUserPlus, FaSeedling, FaHandshake, FaComments } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={40} className="text-green-600" />,
      title: "Sign Up & Create Profile",
      desc: "Join KrishiLink by creating your farmer or buyer profile to start connecting.",
    },
    {
      icon: <FaSeedling size={40} className="text-green-600" />,
      title: "Post Your Crops",
      desc: "Share what you’re growing — add price, image, and details for others to see.",
    },
    {
      icon: <FaComments size={40} className="text-green-600" />,
      title: "Show Interest & Connect",
      desc: "Browse others’ crops and send interest messages to collaborate or buy.",
    },
    {
      icon: <FaHandshake size={40} className="text-green-600" />,
      title: "Grow Together",
      desc: "Build partnerships and grow your agricultural network for mutual success.",
    },
  ];

  return (
    <section className="pb-12 bg-[#E9FDF0]">
      <div className="mx-auto container">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        How KrishiLink Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-16">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-3">{step.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default HowItWorks;
