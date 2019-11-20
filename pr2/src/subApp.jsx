import { store } from './store'

const { useState, useEffect } = React
const { Provider } = ReactRedux
const { Switch, Route, Link, withRouter } = ReactRouterDOM
const { Button } = ITHComponents
const styled = StyledComponents.default

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 15px;
`
const Counter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    store.dispatch({ type: 'UPDATE', payload: 'Counter' })
  }, [store])

  return (
    <Wrapper>
      Hello sub App
      <span>count: {count}</span>
      <Button onClick={() => setCount(count + 1)}>Plus</Button>
      <Button onClick={() => setCount(count - 1)}>Minus</Button>
    </Wrapper>
  )
}
export const HelloSubApp = withRouter(({ match }) => {
  useEffect(() => {
    store.dispatch({ type: 'UPDATE', payload: 'SubApp' })
  }, [store])

  return (
    <Provider store={store}>
      <Switch>
        <Route exact path={match.path}>
          <Link to={`${match.url}/counter`}>See counter</Link>
        </Route>
        <Route path={`${match.path}/counter`}>
          <Counter />
        </Route>
        <Route>
          <p>Not found</p>
        </Route>
      </Switch>
    </Provider>
  )
})
