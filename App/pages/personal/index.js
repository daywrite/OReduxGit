/**
 * Created by yuanguozheng on 16/1/19.
 */
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
    AsyncStorage
} from 'react-native';
import Login from '../login/index';
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    logout() {
        const {navigator} = this.props;
        if (navigator) {
            AsyncStorage.removeItem('authId')
            this.props.navigator.popToTop();
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.logout.bind(this)}>
                    <View style={styles.logout}>
                        <Text style={styles.text}>退出登陆</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    logout: {
        height: 40,
        borderWidth: 1,
        borderColor: '#d74047',
        margin: 10,
        //borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d74047'
    },
    text: {
        fontSize: 16,
        color: 'white'
    }
});
