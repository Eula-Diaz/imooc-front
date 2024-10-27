<script>
const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200'
}

const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}

const EMITS_CLICK = 'click'
</script>

<script setup>
/**
 * 1. 构建 type 风格可选项和 size 大小可选项
 * 2、 通过 props 让开发者控制按钮
 * 3、 区分 icon button 和 text button
 * 4、 依据当前的数据，实现视图
 * 5、 处理点击事件
 */
import { computed } from 'vue'

const props = defineProps({
  // icon 图标
  icon: String,
  // icon 颜色
  iconColor: String,
  // icon 图标类名
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    validator(value, props) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(value)
      if (!result) {
        throw new Error(`你的 type 必须是 ${keys.join('、')} 中的一个`)
      }
      return result
    }
  },
  // 大小风格
  size: {
    type: String,
    default: 'default',
    validator(value, props) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      const result = keys.includes(value)
      if (!result) {
        throw new Error(`你的 size 必须是 ${keys.join('、')} 中的一个`)
      }
      return result
    }
  },
  // 动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载
  loading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([EMITS_CLICK])

const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

/**
 * 点击事件处理
 */
const onBtnClick = () => {
  if (props.loading) return
  emits(EMITS_CLICK)
}
</script>

<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading   -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon   -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <!-- 文字阿牛   -->
    <slot v-else></slot>
  </button>
</template>

<style scoped lang="scss"></style>
