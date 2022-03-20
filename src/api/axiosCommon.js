import router from '../router'
//let a = {name: hello , age : 10}
//qs.Stringfy(a)
//name=hello&age=13
import Qs from 'qs';  /*qs用于序列化参数*/

//包装了ajax ，方便http调用
import axios from 'axios';

//通用公共方法(包含回调)
export const reqRealEndAsync = (method, baseUrl,
                                url, params, callback) => {

    params.token = sessionStorage.getItem('token');/*每次都从sessionStorage中获取token，发送请求的时候都会带上*/

    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        method: method,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify(params),
        //false -- split
        //true -- List<String>
        traditional: true,
    }).then(res => {
        console.log(res);
        let result = res.data;

        //{code : 0 -- 成功的 1/2/其他 -- 失败,message: , data:{{}}}
        if (result.status == 1) {

            //验证失败
            router.replace({
                //path: "/",
                query: {
                    msg: result.message
                }
            });

        } else if (result.status == 0) {
            console.log("gljgljglj");
            //console.log(result.data);
            //成功回调
            //console.log(callback);
            //callback = captchaCallback(code, msg, captchaData) {
            //       // console.log(captchaData);
            //       // this.ruleForm.captchaId = captchaData.id;
            //       this.codeImg = captchaData.imageBase64; // this.$refs.codeImg.src…
            if (callback != undefined) {
                callback(result.status,result.message,result);
            }
        }else if (result.status == 2) {
            //成功回调
            if (callback != undefined) {
                callback(result.code, result.message, result.data);
            }
        }
    });
};

//通用公共方法(不包含回调)
export const reqRealEnd = (method, baseUrl,
                           url, params) => {
    params.token = sessionStorage.getItem('token');
    return axios({
        timeout: 5000,
        baseURL: baseUrl,
        method: method,
        url: url,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: Qs.stringify(params),
        //false -- split
        //true -- List<String>
        traditional: true,
    });
};
