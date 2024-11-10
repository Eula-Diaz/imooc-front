import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants/index.js'
import { getCategory } from '@/api/category.js'
/**
 * 处理 navigationBar 中的数据 categorys
 */

export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    categorys: CATEGORY_NOMAR_DATA
  }),
  mutations: {
    /**
     * 为 categorys 赋值
     * @param state
     * @param newCategorys
     */
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    /**
     * 获取 category 数据，并保存到 vuex 中
     * @param context
     * @returns {Promise<void>}
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
