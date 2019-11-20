import { createLogger } from 'redux-logger'

const { createStore, applyMiddleware } = Redux
const store = createStore((state = '', action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload
    default:
      return state
  }
}, '', applyMiddleware(createLogger({ collapsed: true })))

export { store }
