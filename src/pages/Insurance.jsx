import React from "react";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import drugImge from "./no photo.jpg";
import insc from "../images/insurance_companies_nom.jpeg";

function Insurance() {
  return (
    <section className="insurance">
      <section className="insurance-companies">
        <ul className="links">
          <li>
            <Link to="https://www.sfda.gov.sa/ar/drugs-list" target="_blank">
              sfda
            </Link>
          </li>
          <li>
            <Link to="https://onlineservices.bupa.com.sa/" target="_blank">
              bupa
            </Link>
          </li>
        </ul>
      </section>
      <section className="home-video">
        <YouTube videoId="7wX3Pnjecqc" />
      </section>
      <div>
        {" "}
        <img src={insc} alt="insurance"></img>
      </div>
    </section>
  );
}

export default Insurance;
