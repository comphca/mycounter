import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posiData: [],
    orderData: [],
    tradeData:[],
    hisTradeData:[],
    balance: 0,
  },
  mutations: {
    updatePosi(state,posiInfo){
      state.posiData = posiInfo;
    },
    updateOrder(state,orderInfo){
      state.orderData = orderInfo;
    },
    updateTrade(state,tradeInfo){
      state.tradeData = tradeInfo;
    },
    updateBalance(state,balance){
      state.balance = balance;
    },
    updateHisTradeData(state,hisTradeInfo){
      state.hisTradeData = hisTradeInfo;
    }
  },
  //异步操作，类似mutations
  //actions: {},
  //类似state
  //modules: {}
})
