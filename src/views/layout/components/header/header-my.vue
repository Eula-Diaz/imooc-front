<script setup>
// 构建 menu 数据源
const menuArr = [
  {
    id: '0',
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: '1',
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: '2',
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>

<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!--     头像   -->
        <img
          class="w-3 h-3 rounded-sm"
          src="https://p6-passport.byteacctimg.com/img/user-avatar/70f57170f933eacb9cd6879aea1be4ab~90x90.awebp"
          alt=""
        />
        <!--     下箭头   -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!--     vip   -->
        <m-svg-icon
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
        ></m-svg-icon>
      </div>
    </template>
    <!--  气泡  -->
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
      >
        <m-svg-icon
          class="h-1.5 w-1.5 mr-1"
          :name="item.icon"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-sm text-zinc-800 dark:text-zinc-300">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<style scoped lang="scss"></style>
