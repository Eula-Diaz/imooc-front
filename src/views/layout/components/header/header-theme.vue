<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants/index.js'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极简黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

/**
 * menu 切换事件
 * @param item
 */
const onItemClick = (item) => {
  store.commit('theme/changeThemeType', item.type)
}

/**
 * 展示图标
 */
const svgIconName = computed(() => {
  const findTheme = themeArr.find(
    (item) => item.type === store.getters.themeType
  )
  return findTheme?.icon || 'theme-light'
})
</script>

<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<style scoped lang="scss"></style>
