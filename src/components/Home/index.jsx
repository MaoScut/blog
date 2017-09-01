import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import List from '../List';
// import * as actions from '../../action/async';

export default class Home extends React.Component {
  componentDidMount() {
    this.props.actions.fetchArticles();
  }
  render() {
    return <List articles={this.props.articles} />;
  }
}
//  connect(
//   state => ({
//     articles: state.articles,
//   }),
//   dispatch => ({
//     actions: bindActionCreators(actions, dispatch),
//   }),
// )(Home);
