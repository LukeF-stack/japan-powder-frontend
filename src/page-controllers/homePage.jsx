import React from "react";
import "../App.css";
import HomePageHero from "../components/HomePageHero.jsx";
import Map from "../components/Map.jsx";

function HomePage() {
  return (
    <div className="home">
      <section>
        <HomePageHero />
      </section>
      <section>
        <Map />
      </section>
    </div>
  );
}

export default HomePage;
