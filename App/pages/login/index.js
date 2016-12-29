import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Platform,
    NavigatorIOS,
    InteractionManager
} from 'react-native';
var windowSize = Dimensions.get('window');
const LOGIN_BG = require('../../imgs/login/login-bg.jpg');
const LOGIN_HEADER = require('../../imgs/login/login-header.png');
const USER_ICON = require('../../imgs/login/login-user-icon.png');
const PWD_ICON = require('../../imgs/login/login-password-icon.png');
import Home from '../../pages/home/index';
import Register from './register';
import Loading from '../../component/Loading_DD';
import {connect} from 'react-redux';
import {performLoginAction} from '../../Actions/LoginAction';
import {toastShort} from '../../utils/ToastUtil';
var username = '';
var password = '';
class Index extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    _login() {
        const {navigator, dispatch} = this.props;
        if (username === '') {
            toastShort('用户名不能为空');
            return;
        }
        if (password === '') {
            toastShort('密码不能为空');
            return;
        }
        dispatch(performLoginAction(username, password, navigator));
    }
    _loginSuccess() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({name: '', navigationBarHidden: true, component: Home})
        }
    }
    _resgister() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({name: '', navigationBarHidden: true, component: Register})
        }
    }
    render() {
        const {login} = this.props;
        console.log(login);
        return (
            <View style={styles.container}>
                <Image style={styles.bg} source={LOGIN_BG}/>
                <View style={styles.header}>
                    <Image style={styles.mark} source={LOGIN_HEADER}/>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputUsername} source={USER_ICON}/>
                        <TextInput style={[styles.input, styles.whiteFont]} placeholder="手机号／QQ号／邮箱" placeholderTextColor="#FFF" onChangeText={text => username = text}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputPassword} source={PWD_ICON}/>
                        <TextInput password={true} style={[styles.input, styles.whiteFont]} placeholder="密码" placeholderTextColor="#FFF" onChangeText={text => password = text}/>
                    </View>
                    <View style={styles.forgotContainer}>
                        <Text style={styles.greyFont}>忘记密码？</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={this._login.bind(this)}>
                    <View style={styles.signin}>
                        <Text style={styles.whiteFont}>登陆</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={styles.greyFont}>还没有一个用户?
                        <TouchableOpacity onPress={this._resgister.bind(this)} style={styles.touchable}>
                            <Text style={styles.whiteFont}>注册</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <Loading visible={login.loading}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
        marginLeft: 15,
        width: 20,
        height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
        alignItems: 'flex-end',
        padding: 15
    },
    greyFont: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: '#FFF'
    },
    touchable: {
        width: 50,
        height: 12
    }
});
function mapStateToProps(state) {
    const {login} = state;
    return {login}
}
export default connect(mapStateToProps)(Index);
