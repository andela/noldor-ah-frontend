import React from 'react';
import Loader from 'react-loader-spinner';
import '../styles/loader.scss';

const Loading = () => {
  return (
    <section className="full-height">
      <div className="xyz">
        <Loader type="Hearts" color="#E66869" height="100" width="100" />
      </div>
    </section>
  );
};

export default Loading;
