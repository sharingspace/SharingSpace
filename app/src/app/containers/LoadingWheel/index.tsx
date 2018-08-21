import React from 'react';
import {
  FaSpinner,
} from 'react-icons/fa';

class LoadingWheel extends React.Component {
  render() {
    let containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      flexDirection: 'column'
    }

    let size = 4;
    let spinSpeed = 2;
    let iconContainer = {
      // border: '1px solid red',
      color: 'grey',
      height: size + 'rem',
      width: size + 'rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      'WebkitAnimation': `spin ${spinSpeed}s linear infinite`,
      'MozAnimation': `spin ${spinSpeed}s linear infinite`,
      'animation': `spin ${spinSpeed}s linear infinite`
    }

    return <div style={containerStyle as any}>
      <div className='' style={iconContainer as any}>
        <FaSpinner size={size * 12} />
      </div>
    </div>
  }
}

export default LoadingWheel;
