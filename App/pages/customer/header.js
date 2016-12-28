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
    TouchableOpacity
} from 'react-native';
const CREATE = require('../../imgs/commom/Create.png');
import CreateCustomer from './createcustomer';
export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    create() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({name: '', navigationBarHidden: true, component: CreateCustomer})
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}></View>
                <View style={styles.center}>
                    <Text style={styles.title}>客户列表</Text>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity onPress={this.create.bind(this)}>
                        <View style={styles.signin}>
                            <Image source={CREATE} style={styles.create}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS === 'ios'
            ? 20
            : 0, // 处理iOS状态栏
        height: Platform.OS === 'ios'
            ? 68
            : 48, // 处理iOS状态栏
        backgroundColor: '#d74047'
    },
    left: {
        flex: 1,
        //backgroundColor: 'green'
    },
    center: {
        flex: 1,
        //backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: 'white'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'green',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    create: {
        width: 36,
        height: 36
    }
});
