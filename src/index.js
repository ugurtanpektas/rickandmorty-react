import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {HashRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './general.css';

import Reducers from './Reducers';
import { createStore } from 'redux';
import {Provider} from 'react-redux';

import CharacterDetail from './components/CharacterDetail';

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
        <HashRouter>
            <Route exact path="/" component={App}></Route>
            <Route exact path="/character/:id" component={CharacterDetail}></Route>
        </HashRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
