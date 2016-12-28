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
const RETURN = require('../../imgs/commom/return.png');
export default class CustomerDetailHeader extends Component {
    constructor(props) {
        super(props);
    }
    return () {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <TouchableOpacity onPress={this.return.bind(this)}>
                        <View style={styles.signin}>
                            <Image source={RETURN} style={styles.return}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.center}>
                    <Text style={styles.title}>详细信息</Text>
                </View>
                <View style={styles.right}></View>
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
        flexDirection: 'row',
        //backgroundColor: 'green',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        flex: 1
    },
    return: {
        width: 24,
        height: 24
    }
});
