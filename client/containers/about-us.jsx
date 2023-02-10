import React from "react";
import Card from "../components/card";
import DariaMordvinov from "../static/DariaMordvinov.jpg";
import KevinDooley from "../static/KevinDooley.png";
import Cat from "../static/cat.jpg";
import JasonKuyper from "../static/JasonKuyper.jpg";
import RyanZarou from "../static/RyanZarou.png";
import DisonRuan from "../static/DisonRuan.jpg";

const AboutUs = () => {
  const team = [
    {
      name: "Daria Mordvinov",
      img: DariaMordvinov,
      description: "Software Engineer",
      github: "https://github.com/DariaMordvinov",
      linkedin: "https://www.linkedin.com/in/dariamordvinov/"
    },
    {
      name: "Kevin Dooley",
      img: KevinDooley,
      description: "Software Engineer",
      github: "https://github.com/kjdooley1",
      linkedin: "https://www.linkedin.com/in/kjdooley1/"
    },
    {
      name: "Dison Ruan",
      img: DisonRuan,
      description: "Software Engineer",
      github: "https://github.com/fattyduck123",
      linkedin: "https://www.linkedin.com/in/dison-ruan-2b484953/"
    },
    {
      name: "Jason Kuyper",
      img: JasonKuyper,
      description: "Software Engineer",
      github: "https://github.com/jasonkuyper",
      linkedin: "https://www.linkedin.com/in/jason-kuyper"
    },
    {
      name: "Ryan Zarou",
      img: RyanZarou,
      description: "Software Engineer",
      github: "https://github.com/rzarou",
      linkedin: "https://www.linkedin.com/in/rzarou/"
    }
  ];
  return (
    <div className="font-mono py-20">
      <h3 className="page-title">Meet the team</h3>
      <div className="about-body drawer-content flex-wrap justify-center">
        <Card team={team} />
      </div>
    </div>
  );
};

export default AboutUs;
