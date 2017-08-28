import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '../List';
import * as actions from '../../action/async';

class Home extends React.Component {
  componentDidMount() {
    this.props.actions.fetchArticles();
  }
  render() {
    return <List articles={this.props.articles} />;
  }
}
export default connect(
  state => ({
    articles: state.articles,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Home);
