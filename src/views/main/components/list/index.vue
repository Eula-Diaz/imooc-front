<script setup>
import { ref } from 'vue'
import { getPexelsList } from '@/api/pexels.js'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible'

/**
 * 构建数据请求
 * @type {{size: number, page: number}}
 */
let query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getPexelsData = async (params) => {
  const res = await getPexelsList(params)
  pexelsList.value = res.list
}

getPexelsData(query)
</script>

<template>
  <div>
    <m-waterfall
      class="px-1 w-full"
      :data="pexelsList"
      :nodeKey="'id'"
      :column="isMobileTerminal ? 2 : 5"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item"></item-vue>
      </template>
    </m-waterfall>
  </div>
</template>

<style scoped lang="scss"></style>
