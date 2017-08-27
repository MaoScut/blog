import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home';
import Detail from '../components/Detail';

export default function () {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Detail" component={Detail} />
      </div>
    </Router>
  );
}
