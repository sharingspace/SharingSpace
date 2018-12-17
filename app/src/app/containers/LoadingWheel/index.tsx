import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const style: any = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%'
  },
  icon: {
    color: 'grey',
    'WebkitAnimation': 'spin 1s linear infinite',
    'MozAnimation': 'spin 1s linear infinite',
    'animation': 'spin 1s linear infinite'
  }
};

const LoadingWheel = () => (
  <div style={style.container}>
    <FaSpinner style={style.icon} size={40} />
  </div>
);

export default LoadingWheel;
