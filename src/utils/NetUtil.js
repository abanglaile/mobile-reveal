import React, { Component } from 'react';
import 'whatwg-fetch';
import 'es6-promise';

class NetUtil extends React.Component{
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url, params, resolve, reject){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
            alert("url:" + url);
        }
        //fetch请求
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
                //return response.json();
            })
            .then((responseJSON) => {
                console.log(responseJSON);
                resolve(responseJSON);
            }).catch((err) => {
                console.log(err);
                reject(err);
                console.log(err);
            });
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url,formData,resolve,reject){
        //fetch请求
        //fetch请求
        fetch(url, {
            method: 'POST',
            mode: "cors",
            headers:{
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(formData), 
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
                //return response.json();
            })
            .then((responseJSON) => {
                resolve(responseJSON);
            }).catch((err) => {
                reject(err);
                console.log(err);
            });
    }
 
 
 
}
 
module.exports = NetUtil;