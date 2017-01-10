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
    NavigatorIOS
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
//import ExNavigator from '@exponent/react-native-navigator';
const USER = require('../../imgs/login/register-user-icon.png');
const PWD = require('../../imgs/login/register-pwd-icon.png');
import RegisterHeader from './registerheader';
import {BASE_URL} from '../../common/Config';
import HTTPUtil from '../../utils/HttpUtil';
import {performLoginAction} from '../../Actions/LoginAction';
import {connect} from 'react-redux';
var winHeight = Dimensions.get('window').height;
class Register extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount()
    {
        GiftedFormManager.reset('signupForm');
    }
    _preSubmit() {}
    createUrl() {
        return (BASE_URL + 'user/create');
    }
    render() {
        const {login} = this.props;
        return (
            <View style={styles.container}>
                <RegisterHeader navigator={this.props.navigator}/>
                <GiftedForm formName='signupForm' defaults={{
                    username: '',
                    'gender{M}': true,
                    password: ''
                }} validators={{
                    username: {
                        title: '用户名',
                        validate: [
                            {
                                validator: 'isLength',
                                arguments: [
                                    6, 20
                                ],
                                message: '{TITLE} 必须在 {ARGS[0]} 到 {ARGS[1]} 字符之间'
                            }
                        ]
                    },
                    password: {
                        title: '密码',
                        validate: [
                            {
                                validator: 'isLength',
                                arguments: [
                                    6, 16
                                ],
                                message: '{TITLE} 必须在 {ARGS[0]} 到 {ARGS[1]} 字符之间'
                            }
                        ]
                    }
                }}>
                    <GiftedForm.SeparatorWidget/>
                    <GiftedForm.TextInputWidget name='username' title='用户名' image={USER} placeholder='请输入用户名' clearButtonMode='while-editing'/>
                    <GiftedForm.TextInputWidget name='password' title='密码' image={PWD} placeholder='请输入密码' clearButtonMode='while-editing' secureTextEntry={true}/>
                    <GiftedForm.NoticeWidget title='注册后，您同意服务条款和隐私政策。'/>
                    <GiftedForm.HiddenWidget name='tos' value={true}/>
                    <GiftedForm.SubmitWidget title='注册' widgetStyles={{
                        submitButton: {
                            backgroundColor: '#d74047'
                        }
                    }} preSubmit={this._preSubmit.bind(this)} onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        if (isValid === true) {
                            var usernameVaule = GiftedFormManager.getValue('signupForm', 'username');
                            var passwordVaule = GiftedFormManager.getValue('signupForm', 'password');
                            let formData = {
                                "UserName": usernameVaule,
                                "PassWord": passwordVaule
                            };
                            let headers = {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            };
                            const {navigator, dispatch} = this.props;
                            HTTPUtil.post(this.createUrl(), JSON.stringify(formData), headers).then((json) => {
                                if (json.code === 0) {
                                    this.refs.toast.show("注册成功");
                                    dispatch(performLoginAction(usernameVaule, passwordVaule, navigator));
                                } else {
                                    this.refs.toast.show(json.message);
                                    postSubmit();
                                }
                            }, (json) => {
                                console.log('falie');
                                console.log(json);
                            });/*this.props.navigator.pop();*/
                            /*this.refs.toast.show("注册成功");*/
                        } else {
                            var errorList = validationResults.results;/*console.log(errorList);*/
                            var usernameVaule = GiftedFormManager.getValue('signupForm', 'username');
                            if (usernameVaule === '') {
                                this.refs.toast.show('用户名不能为空');
                                return null;
                            } else {
                                for (var index in errorList) {
                                    if (errorList[index][0].title === '用户名' && errorList[index][0].isValid === false) {
                                        this.refs.toast.show(errorList[index][0].message);
                                        return null;
                                    }
                                }
                            }
                            var passwordVaule = GiftedFormManager.getValue('signupForm', 'password');
                            if (passwordVaule === '') {
                                this.refs.toast.show('密码不能为空');
                                return null;
                            } else {
                                for (var index in errorList) {
                                    if (errorList[index][0].title === '密码' && errorList[index][0].isValid === false) {
                                        this.refs.toast.show(errorList[index][0].message);
                                        return null;
                                    }
                                }
                            }
                        }
                    }}/>
                </GiftedForm>
                <Toast ref="toast" position='center'/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: winHeight
    }
});
function mapStateToProps(state) {
    const {login} = state;
    return {login}
}
export default connect(mapStateToProps)(Register);
