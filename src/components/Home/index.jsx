import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import List from '../List';
// import * as actions from '../../action/async';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchArticles();
  }
  add() {
    this.props.actions.add({
      title: 'aa',
      content: 'bb',
      articleType: 'cc',
    });
  }
  render() {
    return (
      <div>
        <List articles={this.props.articles} />
        <button onClick={this.add}>new article</button>
        <Link to="/myarticle" >new article </Link>
      </div>
    );
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
