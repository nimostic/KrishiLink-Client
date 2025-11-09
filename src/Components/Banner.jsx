import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner_1 from "../assets/banner-1.jpg";
import banner_2 from "../assets/banner-2.jpg";
import banner_3 from "../assets/banner-3.jpg";

const slides = [
  {
    title: "Elevate your outdoor oasis",
    subtitle: "We build amazing experiences",
    bgImage: banner_1,
  },
  {
    title: "Bridging Nature & Intelligence",
    subtitle: "Design. Develop. Deploy.",
    bgImage: banner_2,
  },
  {
    title: "Join Us Today",
    subtitle: "Let's make something great together",
    bgImage: banner_3,
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        {slides.map((slide, index) =>
          index === current ? (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) nextSlide();
                else if (info.offset.x > 50) prevSlide();
              }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-0">
                <motion.h1
                  key={slide.title}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 text-center"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  key={slide.subtitle}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-center"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[#2D6A50] text-white px-3 sm:px-4 py-1 font-semibold sm:py-2 rounded-full"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#2D6A50] text-white px-3 sm:px-4 py-1 font-semibold sm:py-2 rounded-full"
      >
        Next
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
