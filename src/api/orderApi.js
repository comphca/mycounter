import {reqRealEnd, reqRealEndAsync} from './axiosCommon'

import {config} from './frontConfig'

import store from '../store/index'

//查资金
export const queryBalance = () => {
    reqRealEndAsync("post", config.real_domain,
        '/api/balance',
        {uid: sessionStorage.getItem('uid')},
        (code, msg, data) => {
            // store.state.posiData = data;
            store.commit("updateBalance", data)
        })
};

//查持仓
export const queryPosi = () => {
    reqRealEndAsync("post", config.real_domain,
        '/api/posiinfo',
        {uid: sessionStorage.getItem('uid')},
        (code, msg, data) => {
            // store.state.posiData = data;
            store.commit("updatePosi", data)
        })
};

//查股票代码
export const queryCodeName = (params) => {
    return reqRealEnd("post",
        config.real_domain, '/code', params);
};

//查委托
export const queryOrder = () => {
    reqRealEndAsync("post", config.real_domain,
        '/api/orderinfo',
        {uid: sessionStorage.getItem('uid')},
        (code, msg, data) => {
            store.commit("updateOrder", data)
        })
};

//查成交
export const queryTrade = () => {
    reqRealEndAsync("post", config.real_domain,
        '/api/tradeinfo',
        {uid: sessionStorage.getItem('uid')},
        (code, msg, data) => {
            store.commit("updateTrade", data)
        })
};

//发送委托
export const sendOrder = (params,callback) =>{
    return reqRealEndAsync("post",config.real_domain,
        '/doAllot',params,callback);
}

// 委托
export const cancelOrder = (params,callback) => {
    return reqRealEndAsync("post", config.real_domain, '/api/cancelorder', params, callback);
};


//查询当日委托数据
export const queryCurrentTradeDate = (params,callback) => {
    return reqRealEndAsync("post", config.real_domain, '/api/cancelorder', params, callback);
};

//登录的时候查询当日委托数据到vuex中
export const queryCurrentTrade = () => {
    reqRealEndAsync("post", config.real_domain,
        '/queryCurrentDateTrade',
        {},
        (code, msg, data) => {
        console.log("------查询当日委托数据")
            console.log(data)
            store.commit("updateTrade", data.data)
        })
};

//queryHisTrade查询历史委托数据，有参数基金代码或者基金名称和委托时间
export const queryHisTrade = (params) => {
    console.log("------查询历史委托数据111")
    console.log(params);
    reqRealEndAsync("post", config.real_domain,
        '/queryHisTrade',
        params,
        (code, msg, data) => {
            console.log("------查询历史委托数据")
            console.log(data)
            store.commit("updateHisTradeData", data.data)
        })
};
