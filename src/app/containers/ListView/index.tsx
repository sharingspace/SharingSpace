import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export default class ListView extends React.Component<Props, {}> {

  renderListOrNoContent() {
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ,17, 18, 19, 20];

    if(list.length === 0) {
      return <div>
        No content found
      </div>
    } else {
      return <div>
        {list.map((elem, i) => {
          return <div className='each-list-item-container' key={i}>
            <div>
              <img className='each-list-item-image' src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-check-icon.png'} />
            </div>
            <div>Collection name</div>
            <div>Other attrib</div>
            <div>Other attrib</div>
            <div>Other attrib</div>
          </div>
        })}
      </div>
    }

  }

  render() {
    return (
      <div className="list-view-container">
        <div>List view</div>
        <hr />
        {this.renderListOrNoContent()}
      </div>
    );
  }
}
