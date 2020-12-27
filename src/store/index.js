import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recorded_username:''
  },
  mutations: {
    change_user:function(state,username){
      state.recorded_username = username;
    }
  },
  actions: {
  },
  modules: {
  }
})
