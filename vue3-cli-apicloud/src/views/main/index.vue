<template>
  <div id="mainIndex">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="关闭"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div style="top: 5%; height: 85%; width: 100%; position: absolute">
      <component :is="componentId"></component>
    </div>
    <van-tabbar v-model="active" @change="changePage">
      <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import home from '@/views/page1/index.vue'
import search from '@/views/page2/index.vue'
import setting from '@/views/page4/index.vue'
export default {
  data() {
    return {
      active: 'home',
      showShare: false
    }
  },
  components: { home, search, setting },
  computed: mapState(['componentId']),
  setup() {},
  created() {
    this.upComponentId(this.active)
  },
  mounted() {},
  methods: {
    ...mapMutations(['upComponentId', 'upRouterId']),
    changePage() {
      this.upComponentId(this.active)
    },
    onClickLeft() {
      this.upRouterId('home')
    },
    onClickRight() {
      window.api.closeWin({})
    },
    onSelect(option) {
      alert(option.name)
      this.showShare = false
    }
  }
}
</script>
<style scoped>
#mainIndex {
  height: 100%;
  width: 100%;
  background-color: white;
  position: absolute;
}
</style>
