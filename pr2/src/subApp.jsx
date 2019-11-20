const { Provider } = ReactRedux
const { createStore } = Redux
const { Switch, Route, Link, withRouter } = ReactRouterDOM
const { Button } = ITHComponents
const styled = StyledComponents.default

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 15px;
`
const Counter = () => {
  const [count, setCount] = React.useState(0)

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
