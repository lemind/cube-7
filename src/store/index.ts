import Vue from "vue"
import Vuex from "vuex"

import authModules from './auth'
import spaceModules from './space'
import createVuexAPIPlugin from '@/helpers/vuexAPIPlugin'
import { rootEpic } from './root'

Vue.use(Vuex);

const vuexAPIPlugin = createVuexAPIPlugin(rootEpic)

export default new Vuex.Store({
  modules: {
    ...authModules,
    ...spaceModules,
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexAPIPlugin]
});
