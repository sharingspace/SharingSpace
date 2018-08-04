import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import LoadingWheel from '../LoadingWheel';
import { listStore } from '../../stores';

class ListView extends React.Component<Props, {}> {

  listItemClicked(elem) {
    console.log('==== elem', elem);
  }

  renderListOrNoContent() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ,17, 18, 19, 20];
    if(list.length === 0) {
      return (<div>
        No content found
      </div>)
    } else {
      return (<div>
        {list.map((elem, i) => {
          let size = 3;
          let imageUrl = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-check-icon.png';
          let divImageStyle = {
            background: 'url(' + imageUrl + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            flex: `0 ${size}rem`,
            height: `${size}rem`,
          }
          return <div className='each-list-item-container' key={i} onClick={() => this.listItemClicked(elem)}>
            <div style={divImageStyle as any}></div>
            <div>Collection name</div>
            <div>Other attrib</div>
            <div>Other attrib</div>
            <div>Other attrib</div>
          </div>
        })}
      </div>)
    }
  }

  renderLoadingOrList() {
    const { listLoading } = listStore;
    if(listLoading) {
      return <LoadingWheel />
    } else {
      return this.renderListOrNoContent();
    }
  }

  render() {
    return (
      <div className="list-view-container">
        {this.renderLoadingOrList()}
      </div>
    );
  }
}

export default observer(ListView);
