import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../img/animations/loading.json';

const Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default Animation;
