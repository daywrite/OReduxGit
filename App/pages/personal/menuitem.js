'use strict';
import React, {Component} from 'react';
import {
    Image,
    TextInput,
    Text,
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    TouchableHighlight
} from 'react-native';
const ARROW = require('../../imgs/commom/arrow_right.png');
export default class MenuItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let margin2Top = parseInt(this.props.margin2Top);
        return (
            <TouchableHighlight underlayColor="#dad9d7" onPress={this.props.onClick}>
                <View style={[
                    styles.container, {
                        marginTop: margin2Top
                    }
                ]}>
                    <Image style={[styles.iconSize]} source={this.props.icon}/>
                    <Text style={[styles.text]}>{this.props.title}</Text>
                    <Image style={[styles.iconSize]} source={ARROW}/>
                </View>
            </TouchableHighlight>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 45,
        paddingLeft: 20,
        paddingRight: 20
    },
    iconSize: {
        height: 20,
        width: 20,
        resizeMode: Image.resizeMode.contain,
        //backgroundColor: 'red'
    },
    text: {
        flex: 1,
        color: '#333333',
        marginLeft: 10,
        //backgroundColor: 'green'
    }
});
