/**
 * 用户登录Action操作
 */
'use strict';
import * as types from '../common/ActionTypes';
import {BASE_URL} from '../common/Config';
export function performLoginAction(username, password) {
    return dispatch => {
        //显示加载中...
        dispatch(performLogin());
        //请求登陆
        fetch(loginUrl(username, password)).then((responseData) => {
            console.log(responseData);
            //关闭显示中，并返回结构
            dispatch(receiveLoginResult(responseData));
        }).done();
    }
}
/*拼接请求登陆地址Url*/
function loginUrl(username, password) {
    return (BASE_URL + '/user/login/' + username + '/' + password);
}
function performLogin() {
    return {type: types.PERFORM_LOGIN_ACTION}
}
function receiveLoginResult(result) {
    return {type: types.RECEIVE_LOGIN_ACTION, data: result}
}
