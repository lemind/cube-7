import Vue from "vue"
import Vuex from "vuex"

import authModule from './auth'
import createAPIPlugin from '@/helpers/vuexAPIPlugin'
import { rootEpic } from './root';

Vue.use(Vuex);

const APIPlugin = createAPIPlugin(rootEpic)

export default new Vuex.Store({
  modules: {
    auth: authModule
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [APIPlugin]
});
