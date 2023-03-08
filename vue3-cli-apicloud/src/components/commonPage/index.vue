<template>
  <div id="commonIndex">
    <div class="boxShadow">
      <div style="font-size: 2vh; margin-left: 1vh">
        <div class="left"><slot name="icon"></slot></div>
        <div class="right">{{ title }}</div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonIndex',
  props: { title: { type: String, default: '' } }
}
</script>
<style scoped>
#commonIndex {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
.boxShadow {
  /* box-shadow: 0 0 0.5px 1px #999; */
  height: 99.9%;
  width: 99.5%;
  margin-left: 0.25%;
  background-color: white;
}
.content {
  height: 90%;
  width: 100%;
  top: 8%;
  position: absolute;
}
.left {
  position: absolute;
}
.right {
  position: absolute;
  left: 3.2vh;
  top: -0.5vh;
}
</style>
