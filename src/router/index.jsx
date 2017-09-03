import React from 'react';
import { Router, Route } from 'react-router-dom';
// import Home from '../components/Home';
import Detail from '../components/Detail';
import Editor from '../components/Editor';
// import Header from '../components/Header';
// import Login from '../components/Login';
// import Regist from '../components/Regist';
import { Home, Header, Login, Regist, Error, PrivateArticles } from '../components/Connected';
import history from '../history';

export default () => (
  <Router history={history}>
    <div>
      <Route path="/" component={Header} />
      <Route path="/" component={Error} />      
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route path="/detail/:articleId" component={Detail} />
      <Route path="/editor/:articleId" component={Editor} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/regist" component={Regist} />
      <Route exact path="/private" component={PrivateArticles} />
    </div>
  </Router>
);
// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
// } from 'react-router-dom'

// const ParamsExample = () => (
//   <Router>
//     <div>
//       <h2>Accounts</h2>
//       <ul>
//         <li><Link to="/netflix">Netflix</Link></li>
//         <li><Link to="/zillow-group">Zillow Group</Link></li>
//         <li><Link to="/yahoo">Yahoo</Link></li>
//         <li><Link to="/modus-create">Modus Create</Link></li>
//       </ul>

//       <Route path="/:id" component={Child}/>
//     </div>
//   </Router>
// )

// const Child = ({ match }) => (
//   <div>
//     <h3>ID: {match.params.id}</h3>
//   </div>
// )

// export default ParamsExample
// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'

// const PEEPS = [
//   { id: 0, name: 'Michelle', friends: [ 1, 2, 3 ] },
//   { id: 1, name: 'Sean', friends: [ 0, 3 ] },
//   { id: 2, name: 'Kim', friends: [ 0, 1, 3 ], },
//   { id: 3, name: 'David', friends: [ 1, 2 ] }
// ]

// const find = (id) => PEEPS.find(p => p.id == id)

// const RecursiveExample = () => (
//   <Router>
//     <Person match={{ params: { id: 0 }, url: '' }}/>
//   </Router>
// )

// const Person = ({ match }) => {
//   const person = find(match.params.id)

//   return (
//     <div>
//       <h3>{person.name}’s Friends</h3>
//       <ul>
//         {person.friends.map(id => (
//           <li key={id}>
//             <Link to={`${match.url}/${id}`}>
//               {find(id).name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <Route path={`${match.url}/:id`} component={Person}/>
//     </div>
//   )
// }

// export default RecursiveExample