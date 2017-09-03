import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import List from '../List';
// import * as actions from '../../action/async';


export default function ({ privateArticles }) {
  return <List articles={privateArticles || []} />;
}
