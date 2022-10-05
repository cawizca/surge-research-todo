import React from 'react';
import Lottie from 'react-lottie';
import * as networkData from '../img/animations/network.json';

const NetworkAni = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: networkData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} />
    </div>
  );
};

export default NetworkAni;
