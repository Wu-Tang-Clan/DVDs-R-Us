import React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Alert from 'react-s-alert';
import {
  Nav, About, Search, Browse, MoviePage, Login, Admin, LogOut,
  Signup, UserAccount, Cart, landingPage,
} from './components/index';
// eslint-disable-next-line import/no-named-as-default-member

const App = () => (
  <div>
    <HashRouter>
      <div>
        <Route render={(props) => <Nav props={props} />} />
      </div>
      <div className="container">
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
          <Route path="/cart" render={(props) => <Cart props={props} />} />
          <Route path="/useraccount" render={(props) => <UserAccount props={props} />} />
          <Route path="/" component={landingPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </HashRouter>
    <Alert stack={{ limit: 3 }} />
  </div>
);

export default App;
