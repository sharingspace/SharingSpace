import * as React from 'react';
import { observer } from 'mobx-react';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';

export default class Tile extends React.Component<any, {}> {
  render() {

    let containerStyle = {
      display: 'flex',
      width: '100%',
      height: '100%',
      border: '1px solid green',
      position: 'relative'
    }

    let imageUrl = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-check-icon.png';
    let inlineImageStyle = {
      flex: 1,
      width: '100%',
      background: 'url(' + imageUrl + ')',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      border: '1px solid orange',
    }

    let titleStyle = {
      position: 'absolute',
      bottom: 0,
      height: '50%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid purple',
      background: 'rgba(0, 0, 0, .4)',
      color: 'white'
    }

    return <div key={this.props.key} style={containerStyle as any}>
      <div style={inlineImageStyle as any}></div>
      <div style ={titleStyle as any}>
        Title
      </div>
    </div>
  }

}
