import { watch } from "vue"
import {THEME_LIGHT,THEME_DARK,THEME_SYSTEM} from '@/constants'
import store from '@/store'

/**
 * 监听系统主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
  if (!matchMedia) {
    matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    matchMedia.onchange = (e) => {
      changeTheme(THEME_SYSTEM)
    }
  }
}

const changeTheme = (theme) => {
  // html 的 class
  let themeClassName = ''

  switch (theme) {
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_SYSTEM:
      // 调用方法，监听系统主题变化
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
    default:
      themeClassName = ''
  }
  // 修改 html 的 class
  document.querySelector('html').className = themeClassName
}

/**
 * 初始化主题
 */
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}
  
