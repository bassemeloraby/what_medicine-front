import React from "react";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import insc from "../../images/inscTel.png";
// import Zoom from "react-zoom-image-hover";
function Insurance() {
  return (
    <section className="insurance">
      <section className="insurance-companies">
        <ul className="links">
          <li>
            <Link
              to="https://chi.gov.sa/AboutCCHI/CCHIprograms/Pages/IDF.aspx"
              target="_blank"
            >
              الضمان الصحى
            </Link>
          </li>
          <li>
            <Link to="https://onlineservices.bupa.com.sa/" target="_blank">
              bupa
            </Link>
          </li>
          <li>
            <Link to="https://i-care.globemedsaudi.com:8036/" target="_blank">
              I care
            </Link>
          </li>
          <li>
            <Link
              to="https://portal.waseel.com/WaseelSwitch/web/xhtml/login/HomePage.jsf"
              target="_blank"
            >
              waseel
            </Link>
          </li>
        </ul>
      </section>
      <section className="home-video">
        <YouTube videoId="7wX3Pnjecqc" />
      </section>
      <div className="d-flex justify-content-center">
        {" "}
        <img src={insc} alt="insurance"></img>
      </div>
      {/*<div>
        <Zoom height={500} width={830} zoomScale={3} src={insc} />
  </div>*/}
    </section>
  );
}

export default Insurance;
