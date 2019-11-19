const { Provider } = ReactRedux
const { createStore } = Redux

export const HelloSubApp = () => {
  const [count, setCount] = React.useState(0)

  return (
    <Provider store={createStore(() => {})}>
      <div>
        Hello sub App
        <span>count: {count}</span>
        <button onClick={() => setCount(count + 1)}>Plus</button>
        <button onClick={() => setCount(count - 1)}>Minus</button>
      </div>
    </Provider>
  )
}
