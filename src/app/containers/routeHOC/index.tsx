import React from 'react';
import { navStore } from '../../stores/index';

const RouteHOC = (PassedComponent) => {

  class ParentComponent extends React.Component<any, any> {
    componentWillMount() {
      const { match } = this.props;

      // console.warn('ROUTE HOC RENDERS', this.props);

      navStore.saveCurrentMatch(this.props.match)

      // save path to nav store
      navStore.setCurrentPath(this.props.match.path);

    }
    render() {
      return <PassedComponent {...this.props}/>
    }
  }

  return ParentComponent;
}

export default RouteHOC;
