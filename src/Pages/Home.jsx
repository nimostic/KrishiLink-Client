import React from "react";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import LatestCrops from "../Components/LatestCrops";
import HowItWorks from "../Components/HowItWorks";
import AgroNews from "../Components/AgroNews";
import UpcomingEvents from "../Components/UpcomingEvents";
import SuccessStories from "../Components/SuccessStories";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <LatestCrops></LatestCrops>
      <UpcomingEvents></UpcomingEvents>
      <SuccessStories></SuccessStories>
      <AgroNews></AgroNews>
      <HowItWorks></HowItWorks>

    </>
  );
};

export default Home;
