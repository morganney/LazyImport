import { createLogger } from 'redux-logger'

const { createStore, applyMiddleware } = Redux
const store = createStore((state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, area: action.payload }
    case 'INCREMENT':
      return { ...state, count: ++state.count }
    case 'DECREMENT':
      return { ...state, count: --state.count }
    default:
      return state
  }
}, { area: '', count: 0 }, applyMiddleware(createLogger({ collapsed: true })))

export { store }
