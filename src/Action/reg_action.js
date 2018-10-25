import NetUtil from '../utils/NetUtil'
import {push} from 'react-router-redux'
import config from '../utils/Config'
import jwtDecode from 'jwt-decode';
import { checkHttpStatus, parseJSON } from '../utils';
import axios from 'axios';

// const AppID = 'wx6f3a777231ad1747';
// const AppSecret = '881a3265d13a362a6f159fb782f951f9';


let target = config.server_url;


/*-------------------------------------------------*/
//
/*-------------------------------------------------*/
//登录注册相关action
export const loginUserSuccess = (token) => {
  localStorage.setItem('token', token);
  return {
    type: 'LOGIN_USER_SUCCESS',
    payload: {
      token: token
    }
  }
}

export const regUserSuccess = (token) =>  {
  localStorage.setItem('token', token);
  return {
    type: 'REG_USER_SUCCESS',
    payload: {
      token: token
    }
  }
}

export const loginUserFailure = (error) => {
  localStorage.removeItem('token');
  return {
    type: 'LOGIN_USER_FAILURE',
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export const regUserFailure = (error) => {
  localStorage.removeItem('token');
  return {
    type: 'REG_USER_FAILURE',
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export const loginUserRequest = () => {
  return {
    type: 'LOGIN_USER_REQUEST',
  }
}

export const regUserRequest = () => {
  return {
    type: 'REG_USER_REQUEST',
  }
}
// export function getTestCenter() {
//   return {
//     type: GET_TESTCENTER_DATA
    
//   }
// }

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: 'LOGOUT_USER',
    }
}

export const logoutAndRedirect = () => {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/mobile-zq/login'));
    }
}

export const loginUser = (username, password, redirect) => {
   
    let path = '/login';
    let url = target + path;

    // dispatch(loginUserRequest());

    return (dispatch) => {
        // return axios.post(url,{username,password})
        return axios.get(url,{
            params:{
                username,
                password,
            }
        })
        .then(function (response) {
            if(response.data){
                console.log("response.data :",response.data);
            }
        })
        .catch(function (error) {
            dispatch(loginUserFailure(error));
        });
    }


        // return fetch(url, {
        //     method: 'post',
        //     mode: "cors",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //         body: JSON.stringify({username: username, password: password})
        //     })
        //     .then(checkHttpStatus)
        //     .then(parseJSON)
        //     .then(response => {
        //         console.log('response :'+response);
        //         try {
        //             let decoded = jwtDecode(response.token);
        //             console.log('decoded:'+JSON.stringify(decoded));
        //             console.log('response.token:'+response.token);
        //             dispatch(loginUserSuccess(response.token));
        //             dispatch(push(redirect));
        //         } catch (e) {
        //             console.log('response.json():'+response.json());
        //             dispatch(loginUserFailure({
        //                 response: {
        //                     status: 403,
        //                     statusText: response.json()
        //                 }
        //             }));
        //         }
        //     })
        //     .catch(error => {
        //         console.log('error:'+error);
        //         dispatch(loginUserFailure(error));
        //     })
    
}

export const regUser = (username, password, redirect) => {
    return function(dispatch) {
        let path = '/newuser';
        let url = target + path;
        dispatch(regUserRequest());

        return (dispatch) => {
            return axios.post(url,{username,password})
            .then(function (response) {
                if(response.data){
                   console.log("response.data :",response.data);
                }
            })
            .catch(function (error) {
                dispatch(loginUserFailure(error));
            });
        }



        // return fetch(url, {
        //     method: 'post',
        //     mode: "cors",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //         body: JSON.stringify({username: username, password: password})
        //     })
        //     .then(checkHttpStatus)
        //     .then(parseJSON)
        //     .then(response => {
        //         try {
        //             let decoded = jwtDecode(response.token);
        //             dispatch(regUserSuccess(response.token));
        //             dispatch(push(redirect));
        //         } catch (e) {
        //             dispatch(regUserFailure({
        //                 response: {
        //                     status: 403,
        //                     statusText: response.json()
        //                 }
        //             }));
        //         }
        //     })
        //     .catch(error => {
        //         dispatch(loginUserFailure(error));
        //     })
    }
}
//登录注册相关结束
/*-------------------------------------------------*/

export const getWxUserInfoSuccess = (user_info) => {
    // localStorage.setItem('token', token);
    return {
        type: "GET_WX_USERINFO_SUCCESS",
        user_info: user_info
    }
}
const saveTempWxInfo = (wx_info) => {
    return {
        type: "SAVE_TEMP_WX_INFO",
        wx_info,
    }
}

const checkCodeSucess = () => {
    return {
        type: "CHECK_CODE_SUCCESS",
    }
}

const checkCodeFailure = () => {
    return {
        type: "CHECK_CODE_FAILURE",
    }
}

//记录底部标签栏 selected bar 的状态(blueTab RedTab..)
export const setSelectedTab = (tab) => {
     return {
        type: 'GET_SELECTED_TAB',
        tab,
    }
}

export const hideHascodeToast = () => {
    return {
        type: 'HIDE_HASCODE_TOAST',
    }
}

export const jumptohome = () => {
    return (dispatch) => {
        dispatch(push("/mobile-zq/mytest"));
    }
}

export const getWxAuth = (code,state) => {
    // let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code';
    let url = target + "/get_wx_auth";
    return (dispatch) => {
        alert(JSON.stringify(code));
        return axios.get(url,{
                params:{
                   code,
                   state,
                }
        })
        .then(function (response) {
            // let decoded = jwtDecode(response.data.token);
            // alert('decoded:'+JSON.stringify(decoded));  
            // console.log('getWxAuth response.data:'+JSON.stringify(response.data));
            if(response.data.newuser){
                alert('newuser');  
                alert('wx_info:'+JSON.stringify(response.data.wx_info));  
                dispatch(saveTempWxInfo(response.data.wx_info));
            }else{
                alert('olduser');
                dispatch(getWxUserInfoSuccess(response.data.user_info));
                dispatch(push(response.data.redirect_uri));
            }
        })
        .catch(function (error) {
            alert('error getWxAuth' + JSON.stringify(error));
        });
    }
}

export const logoutwx = () => {
    // localStorage.removeItem('token');
    return {
        type: 'LOGOUT_WX_USER',
    }
}

export const logoutwxAndRedirect = () => {
    return (dispatch) => {
        dispatch(logoutwx());
        dispatch(push('/mobile-zq/login'));
    }
}

export const checkInviCode = (wx_info,invitationcode) => {
    let url = target + "/check_invi_code";
    return (dispatch) => {
        return axios.post(url,{wx_info,invitationcode})
        .then(function (response) {
            alert('checkInviCode response.data:'+JSON.stringify(response.data));
            if(response.data.hascode){
                dispatch(getWxUserInfoSuccess(response.data.user_info));
                dispatch(checkCodeSucess());
                dispatch(push("/mobile-zq/mytest"));
            }else{
                dispatch(checkCodeFailure());
            }
        })
        .catch(function (error) {
            alert('error checkInviCode' + JSON.stringify(error));
        });
    }
}

