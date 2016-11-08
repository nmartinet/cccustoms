import React from 'react';
import {render} from 'react-dom';

import {Router, 
        Route, 
        IndexRoute, 
        Link, 
        browserHistory } from 'react-router'


import FrontPage from './components/FrontPage/FrontPage'

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={FrontPage} />
      <Route path="FronPage" component={FrontPage}>
        <Route path="/:lang" component={FrontPage} />
      </Route> 
    </Route>
  </Router>
);
