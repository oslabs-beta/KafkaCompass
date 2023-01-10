import React from "react";
import Card from "../components/card";
import DariaMordvinov from "../static/DariaMordvinov.jpg";
import KevinDooley from "../static/KevinDooley.png";
import Cat from "../static/cat.jpg";

const AboutUs = () => {
  const team = [
    {
      name: "Daria Mordvinov",
      img: DariaMordvinov,
      description: "Software Engineer. Drum player. Dogs admirer",
      github: "https://github.com/DariaMordvinov",
      linkedin: "https://www.linkedin.com/in/dariamordvinov/"
    },
    {
      name: "Kevin Dooley",
      img: KevinDooley,
      description: "Software Engineer with a passion for backend technologies",
      github: "https://github.com/kjdooley1",
      linkedin: "https://www.linkedin.com/in/kjdooley1/"
    },
    {
      name: "Dison Ruan",
      img: Cat,
      description: "Software Engineer",
      github: "https://github.com/fattyduck123",
      linkedin: "https://www.linkedin.com/in/dison-ruan-2b484953/"
    },
    {
      name: "Jason Kuyper",
      img: Cat,
      description: "Software Engineer",
      github: "https://github.com/jasonkuyper",
      linkedin: "https://www.linkedin.com/"
    },
    {
      name: "Ryan Zarou",
      img: Cat,
      description: "Software Engineer",
      github: "https://github.com/rzarou",
      linkedin: "https://www.linkedin.com/"
    }
  ];
  return (
    <div className="about-us font-mono py-20">
      <h3 className="page-title">Meet the team</h3>
      <div className="about-body drawer-content">
        <Card team={team} />
      </div>
    </div>
  );
};

export default AboutUs;
