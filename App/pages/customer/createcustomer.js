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
    AsyncStorage,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
const USER = require('../../imgs/login/register-user-icon.png');
const PWD = require('../../imgs/customer/customer-telphone-icon.png');
import {BASE_URL} from '../../common/Config';
import HTTPUtil from '../../utils/HttpUtil';
import CreateHeader from './createheader';
import ImagePicker from 'react-native-image-picker';
var winHeight = Dimensions.get('window').height;
export default class createcustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            videoSource: null
        };
    }
    _preSubmit() {}
    uploadpic(userid, name, telphone) {
        let formData = new FormData();
        let file = {
            uri: this.state.avatarSource.uri,
            type: 'multipart/form-data',
            name: name + telphone + '.jpg'
        };
        formData.append("images", file);
        formData.append("userid", userid);
        fetch('http://221.208.194.214:8068/' +
            'customer/filepic', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }).then((response) => response.text()).then((responseData) => {
            console.log('responseData', responseData);
        }).catch((error) => {
            console.error('error', error)
        });
    }
    selectPhotoTapped() {
        const options = {
            title: '请选择',
            cancelButtonTitle: '退出',
            takePhotoButtonTitle: '相机',
            chooseFromLibraryButtonTitle: '相册',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                var source;
                // You can display the image using either:
                //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                //Or:
                if (Platform.OS === 'android') {
                    source = {
                        uri: response.uri,
                        isStatic: true
                    };
                } else {
                    source = {
                        uri: response.uri.replace('file://', ''),
                        isStatic: true
                    };
                }
                this.setState({avatarSource: source});
            }
        });
    }
    createUrl() {
        return (BASE_URL + 'customer/create');
    }
    render() {
        return (
            <View style={styles.container}>
                <CreateHeader navigator={this.props.navigator}/>
                <View style={styles.pic}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[
                            styles.avatar,
                            styles.avatarContainer, {
                                marginBottom: 20
                            }
                        ]}>
                            {this.state.avatarSource === null
                                ? <Text>点击</Text>
                                : <Image style={styles.avatar} source={this.state.avatarSource}/>}
                        </View>
                    </TouchableOpacity>
                </View>
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
                                var picUrlStr;
                                if (this.state.avatarSource === null) {
                                    picUrlStr = "NoImage.jpg";
                                } else {
                                    picUrlStr = data + '/' + nameVaule + telphoneVaule + '.jpg';
                                }
                                let sdata = {
                                    "Name": nameVaule,
                                    "TelPhone": telphoneVaule,
                                    "PicUrl": picUrlStr,
                                    "UserId": data
                                };
                                console.log(sdata);
                                let headers = {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                };
                                const {navigator, dispatch} = this.props;
                                HTTPUtil.post(this.createUrl(), JSON.stringify(sdata), headers).then((json) => {
                                    if (json.code === 0) {/*上传图片功能*/
                                        this.uploadpic(data, nameVaule, telphoneVaule);
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
    pic: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: winHeight
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 100,
        height: 100
    }
});
