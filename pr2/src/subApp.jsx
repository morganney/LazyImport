const { Provider } = ReactRedux
const { createStore } = Redux
const { Switch, Route, Link, withRouter } = ReactRouterDOM

const Counter = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      Hello sub App
      <span>count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Plus</button>
      <button onClick={() => setCount(count - 1)}>Minus</button>
    </div>
  )
}
export const HelloSubApp = withRouter(({ match }) => {
  return (
    <Provider store={createStore(() => {})}>
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
