import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import List from '../List';
import { LoginPop, RegistPop } from '../Pop';
// import * as actions from '../../action/async';
import './main.scss';

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
        {this.props.pop.login ? <LoginPop onSubmit={this.props.actions.loginUser} onCancel={this.props.actions.toggleLogin} /> : null}
        {this.props.pop.regist ? <RegistPop onSubmit={this.props.actions.registerUser} onCancel={this.props.actions.toggleRegist} /> : null}
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
