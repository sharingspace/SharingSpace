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
    const { listJS } = listStore;
    const inlineNoContentStyle = {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    };

    if (listJS.length === 0) {
      return (
        <div style={inlineNoContentStyle}>
          No content
        </div>
      );
    } else {
      return (
        <div>
          {listJS.map(elem => {
            {/* console.log('elem', ele m); */}
            const size = 4;
            const imageUrl = elem.parsedImageUrl;
            const divImageStyle: any = {
              background: 'url(' + imageUrl + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              flex: `0 ${size}rem`,
              height: `${size}rem`,
              marginRight: '.5rem'
            };
            return (
              <div className="each-list-item-container" key={elem.entry_id} onClick={() => this.listItemClicked(elem)}>
                <div style={divImageStyle} />
                <div>{elem.display_name} {elem.natural_post_type} {elem.title}</div>
              </div>
            );
          })}
        </div>
      )
    }
  }

  renderLoadingOrList() {
    const { listLoading } = listStore;
    if(listLoading) {
      return <LoadingWheel />;
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
