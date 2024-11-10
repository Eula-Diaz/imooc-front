import { createStore } from 'vuex'
import getters from './getters.js'
import category from './modules/category.js'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      // 指定存储的 key
      key: 'imooc-front',
      // 需要保存的模块
      paths: ['category']
    })
  ]
})

export default store
