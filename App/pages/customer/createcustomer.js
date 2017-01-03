'use strict';
import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Dimensions,
    AsyncStorage
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
const USER = require('../../imgs/login/register-user-icon.png');
const PWD = require('../../imgs/customer/customer-telphone-icon.png');
import {BASE_URL} from '../../common/Config';
import HTTPUtil from '../../utils/HttpUtil';
import CreateHeader from './createheader';
var winHeight = Dimensions.get('window').height;
export default class createcustomer extends Component {
    constructor(props) {
        super(props);
    }
    _preSubmit() {}
    createUrl() {
        return (BASE_URL + 'customer/create');
    }
    render() {
        return (
            <View style={styles.container}>
                <CreateHeader navigator={this.props.navigator}/>
                <GiftedForm formName='signupForm' defaults={{
                    name: '',
                    'gender{M}': true,
                    telphone: ''
                }} validators={{
                    name: {
                        title: '姓名',
                        validate: [
                            {
                                validator: 'isLength',
                                arguments: [
                                    1, 20
                                ],
                                message: '{TITLE} 必须在 {ARGS[0]} 到 {ARGS[1]} 字符之间'
                            }
                        ]
                    },
                    telphone: {
                        title: '电话',
                        validate: [
                            {
                                validator: 'isLength',
                                arguments: [
                                    11, 11
                                ],
                                message: '{TITLE} 必须{ARGS[0]} 个字符'
                            }
                        ]
                    }
                }}>
                    <GiftedForm.SeparatorWidget/>
                    <GiftedForm.TextInputWidget name='name' title='姓名' image={USER} placeholder='请输入姓名' clearButtonMode='while-editing'/>
                    <GiftedForm.TextInputWidget name='telphone' title='电话' image={PWD} placeholder='请输入电话' clearButtonMode='while-editing'/>
                    <GiftedForm.HiddenWidget name='tos' value={true}/>
                    <GiftedForm.SubmitWidget title='添加' widgetStyles={{
                        submitButton: {
                            backgroundColor: '#d74047'
                        }
                    }} preSubmit={this._preSubmit.bind(this)} onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        if (isValid === true) {
                            var nameVaule = GiftedFormManager.getValue('signupForm', 'name');
                            var telphoneVaule = GiftedFormManager.getValue('signupForm', 'telphone');
                            AsyncStorage.getItem('authId').then((data, error) => {
                                let formData = {
                                    "Name": nameVaule,
                                    "TelPhone": telphoneVaule,
                                    "PicUrl": "",
                                    "UserId": data
                                };
                                console.log(formData);
                                let headers = {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                };
                                const {navigator, dispatch} = this.props;
                                HTTPUtil.post(this.createUrl(), JSON.stringify(formData), headers).then((json) => {
                                    if (json.code === 0) {
                                        this.refs.toast.show("添加成功");
                                        postSubmit();
                                        this.props.navigator.pop();
                                    } else {
                                        this.refs.toast.show(json.message);
                                        postSubmit();
                                        return null;
                                    }
                                }, (json) => {
                                    this.refs.toast.show(json.message);
                                    postSubmit();
                                });
                            });
                        } else {
                            var errorList = validationResults.results;
                            console.log(errorList);
                            var usernameVaule = GiftedFormManager.getValue('signupForm', 'name');
                            if (usernameVaule === '') {
                                this.refs.toast.show('姓名不能为空');
                                return null;
                            } else {
                                for (var index in errorList) {
                                    if (errorList[index][0].title === '姓名' && errorList[index][0].isValid === false) {
                                        this.refs.toast.show(errorList[index][0].message);
                                        return null;
                                    }
                                }
                            }
                            var passwordVaule = GiftedFormManager.getValue('signupForm', 'telphone');
                            if (passwordVaule === '') {
                                this.refs.toast.show('电话不能为空');
                                return null;
                            } else {
                                for (var index in errorList) {
                                    if (errorList[index][0].title === '电话' && errorList[index][0].isValid === false) {
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
