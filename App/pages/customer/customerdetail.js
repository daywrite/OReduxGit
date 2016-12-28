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
import CustomerDetailHeader from './customerdetailheader';
export default class customerdetail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <CustomerDetailHeader navigator={this.props.navigator} model={this.props.model}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({});
