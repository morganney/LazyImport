import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'
import * as ReactRouterDOM from 'react-router-dom'
import * as StyledComponents from 'styled-components'
import { Text } from '@intouchhealth/components/typography/text'

import { ExternalAsyncComponent } from './asyncComponent.jsx'

global.React = React
global.ReactDOM = ReactDOM
global.ReactRedux = ReactRedux
global.Redux = Redux
global.ReactRouterDOM = ReactRouterDOM
global.StyledComponents = StyledComponents

const { BrowserRouter: Router, Route, Link, Switch } = ReactRouterDOM
const SubApp = ExternalAsyncComponent({
    baseUrl: 'http://localhost:8080/subapp/dist',
    getBundleUrl: manifest => manifest['subApp.js'],
    getComponent: module => module.SubApp.HelloSubApp
})
const Demo = () => {
  return (
    <>
      <Text>Hi from container.</Text>
      <Link to='/sub-app'>check out the subapp</Link>
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
        <Route path='/sub-app'>
          <SubApp />
        </Route>
        <Route>
          <p>Container route not found</p>
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Hello/>, document.getElementById('app'))
