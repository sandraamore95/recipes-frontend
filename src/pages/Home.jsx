import React from "react";
import PopularRecipes from "../components/PopularRecipes";
import RecipeSearchAndList from "../components/RecipeSearchAndList";
import ChefPicks from "../components/ChefPicks";
import Banner from "../components/Banner";
import HeroSection from "../components/HeroSection";
import { Cooking } from "../components/Cooking";

const Home = () => {
  return (
    <section className="home">
      <Banner />
      <div className="container text-center my-4">
        <HeroSection />
        <PopularRecipes />
        <Cooking />
        <ChefPicks />
      </div>
    </section>
  );
};

export default Home;
