import React from "react";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducer';

import RouteStack from "./RouteStack";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RouteStack />
            </Provider>
        )
    }
}