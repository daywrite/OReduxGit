/**
 * 用户登录Action操作
 */
'use strict';
import * as types from '../common/ActionTypes';
export function performLoginAction() {
    return dispatch => {
        dispatch(performLogin());
        dispatch(receiveLoginResult({result: 1}));
    }
}
function performLogin() {
    return {type: types.PERFORM_LOGIN_ACTION}
}
function receiveLoginResult(result) {
    return {type: types.RECEIVE_LOGIN_ACTION, data: result}
}
