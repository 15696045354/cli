<template>
  <div id="page2">
    <div class="gridClass" v-for="i in 8" ::key="i">
      <span>{{ i }}</span>
      <van-grid :column-num="4">
        <van-grid-item
          v-for="value in 8 + i"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      cmp: [
        {
          name: 'page1',
          val: import('@/views/page1/index.vue')
        },
        {
          name: 'page2',
          val: import('@/views/page2/index.vue')
        }
      ]
    }
  }
}
</script>
<style scoped>
#page2 {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: auto;
}

.gridClass {
  width: 90%;
  margin-left: 5%;
  height: auto;
  box-shadow: 0.5px 0.5px 0.5px #999;
  margin-top: 5%;
}
</style>
