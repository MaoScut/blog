import React from 'react';
import { connect } from 'redux';

import history from '../../history';

export default function (ComposedComponent) {
  class Authentication extends React.Component {
    // static contextTypes = {
    //   router: React
    // }
    componentWillMount() {
      if (!this.props.authenticated) {
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push('/login');
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  return connect(
    state => ({
      authenticated: state.auth.authenticated,
    })(Authentication),
  );
}
