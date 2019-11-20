import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'
import * as ReactRouterDOM from 'react-router-dom'
import * as ITHComponents from '@intouchhealth/components'
import * as StyledComponents from 'styled-components'

import { ExternalAsyncComponent } from './asyncComponent.jsx';

global.React = React
global.ReactDOM = ReactDOM
global.ReactRedux = ReactRedux
global.Redux = Redux
global.ReactRouterDOM = ReactRouterDOM
global.ITHComponents = ITHComponents
global.StyledComponents = StyledComponents

const { BrowserRouter: Router, Route, Link, Switch } = ReactRouterDOM
const LazyComponent = ExternalAsyncComponent({
    baseUrl: '/pr2/dist',
    getBundleUrl: manifest => manifest['subApp.js'],
    getComponent: module => module.SubApp.default
});
const Demo = () => {
  return (
    <>
      <p>Hi from container.</p>
      <Link to='/subapp'>check out the subapp</Link>
    </>
  )
}
const SubApp = () => {
  return (
    <>
      <p>Hi from subapp.</p>
      <LazyComponent />
    </>
  )
}
const Hello = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Demo />
        </Route>
        <Route path='/subapp'>
          <SubApp />
        </Route>
        <Route>
          <p>Container route not found</p>
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Hello/>, document.getElementById('app'));
