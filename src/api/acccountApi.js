// 获取证件类型
import {reqRealEndAsync,reqRealEnd} from "./axiosCommon";
import {config} from "./frontConfig";

export const getIDType = (params,callback) => {
    return reqRealEndAsync("post", config.real_domain,
        "/dic/queryDic", params, callback);
};


// 客户注册
export const regist = (params, callback) => {
    return reqRealEnd("post", config.real_domain,
        "/doOpenFundAcco", params, callback);
};
