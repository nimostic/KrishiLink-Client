const AgroNews = () => {
  const newsList = [
    {
      title: "Modern Irrigation Boosts Crop Yields",
      desc: "Farmers adopting smart irrigation systems have seen a 25% growth in production this year.",
      img: "https://images.unsplash.com/photo-1738598665698-7fd7af4b5e0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      news: "https://futurepump.com/modern-irrigation-for-farming-needs/",
    },
    {
      title: "Organic Fertilizer Gaining Popularity",
      desc: "Local farmers are shifting toward organic fertilizers to improve soil health and reduce costs.",
      img: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=600",
      news: "https://www.fortunebusinessinsights.com/organic-fertilizers-market-103211",
    },
    {
      title: "Digital Platforms Helping Farmers Connect",
      desc: "New digital tools like KrishiLink are empowering farmers to trade and collaborate online.",
      img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600",
      news: "https://www.researchgate.net/publication/391435248_Digital_Platforms_for_Farmer_Connectivity",
    },
  ];

  return (
    <section className="pb-12 bg-[#E9FDF0]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Agro News & Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16">
          {newsList.map((news, i) => (
            <div
              key={i}
              className="rounded-2xl shadow-md bg-green-50 overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={news.img}
                alt={news.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-green-700 mb-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{news.desc}</p>
                <a
                  href={news.news}
                  target="blank"
                  className="text-green-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgroNews;
