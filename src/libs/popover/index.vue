<script>
// 延迟关闭时间
const DELAY_TIME = 100
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  // 控制气泡弹出位置，给出开发者错误提示
  placement: {
    type: String,
    default: PROP_TOP_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnum.join('、')} 中的一个`
        )
      }
      return result
    }
  }
})

const isVisible = ref(false)
/**
 * 鼠标移入触发
 */
let timeout
const onMouseenter = () => {
  isVisible.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}

/**
 * 鼠标移出触发
 */
const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisible.value = false
    timeout = null
  }, DELAY_TIME)
}

/**
 * 计算元素的尺寸
 */
const referenceTarget = ref(null)
const contentTarget = ref(null)

const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

/**
 * 气泡样式
 */
const contentStyle = ref({
  top: 0,
  left: 0
})

// 计算气泡位置
watch(isVisible, (val) => {
  if (!val) return
  // 等待元素渲染
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value = {
          top: 0,
          left: -useElementSize(contentTarget.value).width + 'px'
        }
        break
      case PROP_TOP_RIGHT:
        contentStyle.value = {
          top: 0,
          left: useElementSize(referenceTarget.value).width + 'px'
        }
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value = {
          top: useElementSize(referenceTarget.value).height + 'px',
          left: -useElementSize(contentTarget.value).width + 'px'
        }
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value = {
          top: useElementSize(referenceTarget.value).height + 'px',
          left: useElementSize(referenceTarget.value).width + 'px'
        }
        break
    }
  })
})
</script>

<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!--  具名插槽：触发弹出层的视图  -->
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-if="isVisible"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border rounded-md dark:border-zinc-700"
        :style="contentStyle"
      >
        <!--  匿名插槽：弹出层内容  -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
