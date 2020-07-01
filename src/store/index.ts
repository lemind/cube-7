import Vue from "vue"
import Vuex from "vuex"

import authModules from './auth'
import spaceModules from './space'
import createAPIPlugin from '@/helpers/vuexAPIPlugin'
import { rootEpic } from './root';

Vue.use(Vuex);

const APIPlugin = createAPIPlugin(rootEpic)

export default new Vuex.Store({
  modules: {
    ...authModules,
    ...spaceModules,
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [APIPlugin]
});
