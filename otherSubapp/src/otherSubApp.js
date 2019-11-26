import { Button, ThemeProvider, RadioGroup, Radio, Heading, Box, Flex } from '@intouchhealth/components'
import { store } from './store'

const { useState, useEffect } = React
const { Provider, connect } = ReactRedux
const { Switch, Route, Link, withRouter } = ReactRouterDOM
const styled = StyledComponents.default

const FontStyles = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 500;
`
const Wrapper = styled(Flex)`
  border: 1px solid black;
  padding: 15px;
  flex-direction: column;
  > div:last-child {
    margin-top: 20px;
  }
`
const Counter = connect(
  state => ({ count: state.count }),
  {
    update: () => ({ type: 'UPDATE', payload: 'Counter' }),
    increment: () => ({ type: 'INCREMENT' }),
    decrement: () => ({ type: 'DECREMENT' })
  }
)(({ count, update, increment, decrement }) => {
  const [value, setValue] = useState('foo')

  useEffect(() => {
    update()
  }, [update])

  return (
    <Wrapper>
      <Box>
        <Heading level='2'>Count: {count}</Heading>
        <Button onClick={() => increment()}>Plus</Button>
        <Button onClick={() => decrement()}>Minus</Button>
      </Box>
      <Box>
        <RadioGroup value={value} name='foobar' onChange={evt => setValue(evt.target.value)}>
          <Radio label='Foo' value='foo' />
          <Radio label='Bar' value='bar' />
        </RadioGroup>
      </Box>
    </Wrapper>
  )
})
export const HelloOtherSubApp = withRouter(({ match }) => {
  useEffect(() => {
    store.dispatch({ type: 'UPDATE', payload: 'OtherSubApp' })
  }, [store])

  return (
    <ThemeProvider>
      <Provider store={store}>
        <FontStyles>
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
        </FontStyles>
      </Provider>
    </ThemeProvider>
  )
})
