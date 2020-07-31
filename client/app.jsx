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

// export default class App extends Component {
const App = () => (
  // {
  // render() {
  // return (
  <div className="container">
    <HashRouter>
      <div>
        <Route component={Nav} />
      </div>
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/search" render={() => <Search />} />
        <Route exact path="/browse" render={(props) => <Browse props={props} />} />
        <Route path="/browse/:id?" render={(props) => <MoviePage props={props} />} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  </div>
);
  // );
  // }
// }

export default App;
