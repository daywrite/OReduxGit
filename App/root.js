import React, {Component} from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';
import App from './app'
const store = configureStore();
class rootApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}
export default rootApp;
