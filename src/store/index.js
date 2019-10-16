import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import users from './moduls/users/';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users
    },
    plugins: [createPersistedState({
        key: 'VUE_POC'
    })]
  })