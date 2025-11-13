import React from "react";

const stories = [
  {
    name: "Rahim Uddin",
    story: "Using KrishiLink, I sold 500kg of tomatoes directly to buyers without middlemen, increasing my income by 40%!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Fatema Khatun",
    story: "My organic vegetables reached the city market easily thanks to the platform's logistics support and fair pricing.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Jamal Hossain",
    story: "I connected with multiple buyers and increased my profit by 30%. The weather alerts have also been invaluable.",
    photo: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    name: "Ayesha Bibi",
    story: "KrishiLink helped me find the best price for my jute harvest instantly. The process was transparent and simple.",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Motiur Rahman",
    story: "I got a bulk order for my potatoes from a big hotel chain. This was a game-changer for my small farm!",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Halima Begum",
    story: "The market insights provided by the app allowed me to switch to a more profitable crop this season.",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Kabir Dewan",
    story: "No more long trips to the market! I can sell everything from my phone and arrange pickup directly.",
    photo: "https://randomuser.me/api/portraits/men/14.jpg",
  },
];

const MARQUEE_STYLE = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } 
  }
  .animate-marquee {
    display: flex;
    animation: marquee 20s linear infinite;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

const SuccessStories = () => {
  const repeatedStories = [...stories, ...stories];

  return (
    <div className="bg-[#E9FDF0] py-12">
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_STYLE }} />

      <div className="mx-auto container px-4 md:px-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        Success Stories
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Hear directly from the farmers who are transforming their lives and businesses using <strong>KrishiLink</strong>.
        </p>

        <div className="overflow-hidden py-6">
          <div className="animate-marquee gap-4">
            {repeatedStories.map((story, index) => (
              <div
                key={index}
                className="shrink-0 w-[320px] p-2"
              >
                <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-green-500 flex flex-col justify-between transition duration-300 hover:shadow-2xl h-full">
                  <blockquote className="text-gray-800 text-base italic mb-4 wrap-break-word">
                    {story.story}
                  </blockquote>
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <img
                      src={story.photo}
                      alt={story.name}
                      className="w-14 h-14 rounded-full mr-4 object-cover ring-2 ring-green-300"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-green-800">{story.name}</h3>
                      <p className="text-sm text-gray-500">Local Farmer</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
