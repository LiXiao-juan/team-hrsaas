import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tickets from './modules/tickets'
import createVuexPersisted from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    tickets
  },
  getters,
  plugins: [
    createVuexPersisted({
      reducer(val) {
        // 指定存储某个模块的数据
        return {
          user: val.user
        }
      }
    })
  ]
})

export default store
