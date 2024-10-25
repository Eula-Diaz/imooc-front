import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})


/**
 * 动态指定 rem 基准值，最大为 40px
 */
export const useREM = () => {
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    // 拿到 html 标签
    const html = document.querySelector('html')
    // 根据屏幕宽度计算基准值
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}