import {combineReducers} from 'redux';

import characterReducer from './reducers/characterReducer';

const Reducers = combineReducers({
    characters:characterReducer
})

export default Reducers;