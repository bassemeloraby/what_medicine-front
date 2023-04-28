import React, { Fragment } from 'react';
import YouTube from 'react-youtube';
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <Fragment>
    
      <section className="home">
        <section className="home-header">
          <h2 className="">Welcome to my new site</h2>
        </section>
        <section className="home-video">
          <YouTube videoId="7wX3Pnjecqc" />
        </section>
      </section>
    </Fragment>
  );
}

export default Home;
