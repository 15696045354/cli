<template>
  <router-view />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppIndex',
  computed: mapState(['routerId']),
  data() {
    return {}
  },
  watch: {
    routerId(nVal) {
      this.$router.push({ name: nVal })
    }
  },
  created() {},
  mounted() {
    window.apiready = () => {
      /*  window.api.setScreenOrientation({
        orientation: 'landscape_left'
      }) */
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  background-image: url(@/assets/back.png);
}
</style>
