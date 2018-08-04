import { Props } from '../Root';
import * as React from 'react';
import { observer } from 'mobx-react';
import { listStore } from '../../stores';

class SearchInput extends React.Component<any, {}> {

  onQueryChange(e) {
    const { setQuery } = listStore;
    setQuery(e.target.value)
  }

  render() {

    let inlineContainerStyle = {
      border: '1px solid red',
      paddingLeft: '.3rem',
      paddingRight: '.3rem',
    }

    let inlineInputStyle = {
      fontSize: '1.1rem',
      borderRadius: '1.5rem',
      border: '1px solid lightgrey',
      marginTop: '.5rem',
      marginBottom: '.5rem',
      padding: '.5rem',
      width: '100%'
    }

    const { query, setQuery } = listStore;
    return <div style={inlineContainerStyle}>
      <input
        style={inlineInputStyle}
        value={query}
        onChange={(e) => this.onQueryChange(e)}
        placeholder="Search Channel 1"
      />
    </div>
  }
}

export default observer(SearchInput);
