import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Login from '../pages/login/index';
class AppMain extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<Login navigator={this.props.navigator}/>)
    }
}
export default AppMain;
