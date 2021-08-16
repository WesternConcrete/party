import {createStore} from 'redux'

import {addContact} from './actions'
import reducer from './reducer'

const store = createStore(reducer)

export default store
