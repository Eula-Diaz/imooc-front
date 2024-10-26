<script setup>
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})

const emits = defineEmits(['update:modelValue'])

// 锁定滚动
const isLocked = useScrollLock(document.body)
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val
  },
  { immediate: true }
)
</script>

<template>
  <teleport to="body">
    <!--蒙版-->
    <transition name="fade">
      <div
        v-if="modelValue"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        @click="emits('update:modelValue', false)"
      ></div>
    </transition>
    <!--内容-->
    <transition name="popup-down-up">
      <div
        v-if="modelValue"
        v-bind:is="$attrs"
        class="w-screen bg-white z-50 fixed bottom-0"
      >
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
