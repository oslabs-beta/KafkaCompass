import React from "react";
import DariaMordvinov from "../static/DariaMordvinov.jpg";
import KevinDooley from "../static/KevinDooley.png";
import Cat from "../static/cat.jpg";
import JasonKuyper from "../static/JasonKuyper.jpg";
import RyanZarou from "../static/RyanZarou.png";
import DisonRuan from "../static/DisonRuan.jpg";

// const Card = ({ team }) => {
//   return (
//     <>
//       {team.map((person) => (
//         <div className="bio-card card w-70 bg-base-100 shadow-xl flex-grow-1">
//           <img
//             src={person.img}
//             alt={person.name}
//             className="bio-pic rounded-xl object-cover"
//           />
//           <div className="bio-body card-body items-center text-center">
//             <h2 className="card-title">{person.name}</h2>
//             <p>{person.description}</p>
//             <div className="card-actions">
//               <form className="about-links">
//                 <a className="about-links" href={person.github}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                   </svg>
//                 </a>
//                 <a className="about-links" href={person.linkedin}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                   </svg>
//                 </a>
//               </form>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Card;

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

const people = [
  {
    name: "Daria Mordvinov",
    title: "Software Engineer",
    img: DariaMordvinov,
    github: "https://github.com/DariaMordvinov",
    linkedin: "https://www.linkedin.com/in/dariamordvinov/"
  },
  {
    name: "Kevin Dooley",
    img: KevinDooley,
    title: "Software Engineer",
    github: "https://github.com/kjdooley1",
    linkedin: "https://www.linkedin.com/in/kjdooley1/"
  },
  {
    name: "Dison Ruan",
    img: DisonRuan,
    title: "Software Engineer",
    github: "https://github.com/fattyduck123",
    linkedin: "https://www.linkedin.com/in/dison-ruan-2b484953/"
  },
  {
    name: "Jason Kuyper",
    img: JasonKuyper,
    title: "Software Engineer",
    github: "https://github.com/jasonkuyper",
    linkedin: "https://www.linkedin.com/in/jason-kuyper"
  },
  {
    name: "Ryan Zarou",
    img: RyanZarou,
    title: "Software Engineer",
    github: "https://github.com/rzarou",
    linkedin: "https://www.linkedin.com/in/rzarou/"
  }
];

export default function AboutUsCards() {
  return (
    <ul
      role="list"
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-4"
      style={{ minWidth: "200px" }}
    >
      {people.map((person) => (
        <li
          key={person.name}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow min-w-min"
        >
          <div className="flex flex-1 flex-col p-8">
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              src={person.img}
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{person.title}</dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1 justify-center">
                <a className="about-links" href={person.linkedin}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1 justify-center">
                <a className="about-links" href={person.github}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
