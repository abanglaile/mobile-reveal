import 'whatwg-fetch';
import 'es6-promise';

var NetUtil = {};
/**
 * 基于 fetch 封装的 GET请求 
 * @param url 
 * @param params {} 
 * @param headers 
 * @returns {Promise} 
 */  
NetUtil.get = function(url, params, headers) {  
    if (params) {  
        let paramsArray = [];  
        //encodeURIComponent  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
        if (url.search(/\?/) === -1) {  
            url += '?' + paramsArray.join('&')  
        } else {  
            url += '&' + paramsArray.join('&')  
        }  
    }  
    return new Promise(function (resolve, reject) {  
      fetch(url, {  
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },  
          })  
          .then((response) => {  
              if (response.ok) {  
                  return response.json();  
              } else {  
                  reject({status:response.status})  
              }  
          })  
          .then((response) => {  
              resolve(response);  
          })  
          .catch((err)=> {  
            reject({status:-1});  
          })  
    })  
}  


/** 
 * 基于 fetch 封装的 POST请求  FormData 表单数据 
 * @param url 
 * @param formData   
 * @param headers 
 * @returns {Promise} 
 */  

NetUtil.post = function(url, formData, headers) {  
    return new Promise(function (resolve, reject) {  
      fetch(url, {  
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'token': headers
            },
            body: JSON.stringify(formData),  
          })  
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
          })  
          .then((response) => {
              resolve(response);  
          })  
          .catch((err)=> {
            reject({status:-1});
          })  
    })  
}  

export default NetUtil;