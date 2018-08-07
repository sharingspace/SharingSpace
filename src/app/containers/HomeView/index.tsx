import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import RainbowImage from '../../../assets/images/anyshare-rainbow.png';

class HomeView extends React.Component<Props, {}> {

  render() {
    let rainbowImageContainerStyle = {
      width: '100%',
      height: '.8rem',
      background: 'url(' + RainbowImage + ')',
      position: 'absolute',
      bottom: 0
    }

    return (
      <div className="home-view-container">
        <h1>The New Way to Share</h1>
        <h2>Sharing Space makes it easy to share skills, things, and ideas within any group or community.</h2>
        <div style={rainbowImageContainerStyle as any}></div>
      </div>
    );
  }
}

export default observer(HomeView);
