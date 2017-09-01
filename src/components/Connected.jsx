// import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../action/async';
import Home from './Home';
import Header from './Header';
import Login from './Login';
import Regist from './Regist';
import Error from './Error';

function mapDispatchToProps(dispatch) {
  return ({
    actions: bindActionCreators(actions, dispatch),
  });
}

const CHome = connect(
  state => ({
    articles: state.articles,
  }),
  mapDispatchToProps,
)(Home);

const CHeader = connect(
  state => state,
  mapDispatchToProps,
)(Header);

const CLogin = connect(
  state => state,
  mapDispatchToProps,
)(Login);

const CRegist = connect(
  state => state,
  mapDispatchToProps,
)(Regist);

const CError = connect(
  state => state,
  mapDispatchToProps,
)(Error);
export {
  CHeader as Header,
  CHome as Home,
  CLogin as Login,
  CRegist as Regist,
  CError as Error,
};

