import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import invariant from 'redux-immutable-state-invariant'

const initialState = {}

const middleware = [thunk]


const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(invariant(), ...middleware)))

export default store