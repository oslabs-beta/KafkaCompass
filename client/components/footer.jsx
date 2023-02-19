import React from "react";
import logoWithoutText from "../static/logo_without_text.png";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-gray-700 text-neutral-content mt-auto">
        <div>
          <img className="h-12" src={logoWithoutText} alt="Kafka logo" />
          <p>
            KafkaCompass
            <br />
            An open source tool for monitoring your Kafka clusters
          </p>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.linkedin.com/company/kafkacompass/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="LinkedIn"
                role="img"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                fill="#fff"
                className="hover:scale-110 transition duration-300 ease-in-out"
              >
                <rect width="512" height="512" rx="15%" fill="#0077b5" />
                <circle cx="142" cy="138" r="37" />
                <path
                  stroke="#fff"
                  stroke-width="66"
                  d="M244 194v198M142 194v198"
                />
                <path d="M276 282c0-20 13-40 36-40 24 0 33 18 33 45v105h66V279c0-61-32-89-76-89-34 0-51 19-59 32" />
              </svg>
            </a>
            <a
              href="https://medium.com/@daria.mordvinov/dont-get-lost-while-working-with-your-kafka-clusters-grab-a-compass-dff330bf387e"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Medium"
                role="img"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                className="hover:scale-110 transition duration-300 ease-in-out"
              >
                <rect width="512" height="512" rx="15%" fill="#12100e" />
                <path
                  fill="#fff"
                  d="M125 173c0-4-2-9-5-11l-31-38v-6h98l75 166 67-166h93v6l-27 26c-2 1-3 4-3 7v190c0 3 1 6 3 8l27 25v6H289v-6l27-26c3-3 3-4 3-8V193l-76 192h-10l-88-192v129c-1 5 1 11 5 15l35 43v5H85v-5l35-43c4-4 6-10 5-15z"
                />
              </svg>
            </a>
            <a href="https://angel.co/company/kafkacompass" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="AngelList"
                role="img"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                className="hover:scale-110 transition duration-300 ease-in-out"
              >
                <rect width="512" height="512" rx="15%" fill="#fff" />
                <path d="M342 230c39 4 47 43 47 75 0 65-33 128-95 154-51 21-114 13-155-25-25-22-39-51-40-84 0-30 15-49 44-57-3-8-9-19-9-28 0-18 20-40 38-40 9 0 17 3 24 8-15-58-75-175-5-181 34-3 69 125 78 153 11-26 45-145 80-145 66 0 7 130-7 170zM138 348c13 13 22 41 45 41 29-3-18-76-39-76-17 0-26 21-26 36 0 38 31 74 65 89 50 23 111 12 149-29 33-37 43-88 34-136-3-24-35-29-54-33-23-6-47-8-71-8-30 0-17 36 3 44 26 9 55 9 83 9 6 0 9 6 9 12-13 10-30 13-43 23a79 79 0 00-34 86c2 7 4 14 4 21-26 0-27-37-27-54-5 5-13 4-20 3 4 18-5 38-27 38-24 0-55-26-55-52 0-4 1-11 4-14zm86 6c35 0-8-67-15-77-10-17-28-38-46-20s7 50 19 65c10 14 23 32 42 32zm28-140l-32-87c-4-12-18-56-32-56-26 0-7 51-4 62 7 22 17 51 31 85 10-7 26-6 37-4zm32 88c-15 0-32-2-45-8 5 13 10 24 13 38 9-12 20-22 32-30zm39-77c13-34 22-64 30-86 3-10 22-59-1-59-17 0-32 43-36 56l-29 82 36 7z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
