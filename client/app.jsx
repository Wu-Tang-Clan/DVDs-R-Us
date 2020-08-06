//  Different from index.js file - we can use the Provider, BrowserRouter, Nav, Switch here
import React, {
// Component,
} from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Nav from './components/nav';
import About from './components/about';
import Search from './components/search';
import Browse from './components/browse';
import MoviePage from './components/moviePage';
// eslint-disable-next-line import/no-named-as-default-member
import Login from './components/login';
import Admin from './components/admin';
import LogOut from './components/logoutPage';
import Signup from './components/signup';
import UserAccount from './components/userAccount';

// export default class App extends Component {
const App = () => (
  // {
  // render() {
  // return (
  <div className="container">
    <HashRouter>
      <div>
        <Route render={(props) => <Nav props={props} />} />
      </div>
      <Switch>
        <Route exact path="/login" render={(props) => <Login props={props} />} />
        <Route exact path="/about" component={About} />
        <Route exact path="/search" render={(props) => <Search props={props} />} />
        <Route exact path="/browse" render={(props) => <Browse props={props} />} />
        <Route exact path="/logout" render={(props) => <LogOut props={props} />} />
        <Route path="/browse/:id?" render={(props) => <MoviePage props={props} />} />
        <Route path="/admin/:id?" render={(props) => <Admin props={props} />} />
        <Route path="/search/:id?" render={(props) => <MoviePage props={props} />} />
        <Route path="/signup" render={(props) => <Signup props={props} />} />
        <Route path="/useraccount" render={(props) => <UserAccount props={props} />} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
