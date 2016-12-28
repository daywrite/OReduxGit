'use strict';
import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View
} from 'react-native';
import CreateHeader from './createheader';
export default class createcustomer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <CreateHeader navigator={this.props.navigator}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({});
