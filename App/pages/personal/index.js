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
    AsyncStorage,
    Dimensions
} from 'react-native';
import Login from '../login/index';
var winWidth = Dimensions.get('window').width;
import ForgetPassword from '../login/forgetpassword';
const TELPHONE = require('../../imgs/customer/customer-telphone-icon.png');
//const ARROW = require('../../imgs/commom/arrow_right.png');
import MenuItem from './menuitem';
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
    connect() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({name: '', navigationBarHidden: true, component: ForgetPassword})
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <MenuItem title='联系我' icon={TELPHONE} margin2Top='1' onClick={this.connect.bind(this)}/>
                <MenuItem title='找回密码' icon={TELPHONE} margin2Top='1' onClick={this.connect.bind(this)}/>
                <MenuItem title='找回密码' icon={TELPHONE} margin2Top='1' onClick={this.connect.bind(this)}/>
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
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    linkicon: {
        //backgroundColor: 'orange',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linktext: {
        //backgroundColor: 'green',
        flex: 5,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    linkright: {
        //backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    telphone: {
        height: 16,
        width: 16
    },
    arrow: {
        height: 16,
        width: 16
    },
    body: {
        marginTop: 10,
        //backgroundColor: 'red',
        height: 40,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#d74047',
        borderBottomColor: '#d74047'
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
