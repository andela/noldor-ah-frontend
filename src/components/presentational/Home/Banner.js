/* eslint-disable max-len */
import React from 'react';

const Banner = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="box is-pt3 is-pb3 is-pl3 is-pr3">
          <div className="columns banner">
            <div className="column is-8">
              <h1 className="title is-2 is-size-3-mobile">JOIN THE COMMUNITY</h1>
              <p className="subtitle is-5">Authors Haven is a community
              of like minded authors and readers that foster
              inspiration and innovation</p>

              <a href="/signup"
                className="button is-large is-small-mobile is-pl2 is-pr2 theme-background">
              GET STARTED</a>
            </div>
            <div className="column is-4">
              <img className="banner-logo" src="https://res.cloudinary.com/dstvcmycn/image/upload/v1543246158/Author%27s%20Haven/Asset_1_4x.png" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
