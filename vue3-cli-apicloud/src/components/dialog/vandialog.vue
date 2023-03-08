<template>
  <div>
    <van-dialog
      v-model:show="centerDialogVisible"
      :title="title"
      :showConfirmButton="showConfirmButton"
      :showCancelButton="showCancelButton"
      :close-on-click-overlay="closeOnClickModal"
      :lockScroll="lockScroll"
      :confirmButtonText="confirmButtonText"
      width="120vh"
    >
      <div class="center">
        <slot name="center"></slot>
      </div>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: 'MyDialog',
  props: {
    title: { type: String },
    lockScroll: { type: Boolean, default: true },
    closeOnClickModal: { type: Boolean, default: true },
    showConfirmButton: { type: Boolean, default: false },
    showCancelButton: { type: Boolean, default: false },
    showLog: { type: Boolean, default: false },
    confirmButtonText: { type: String, default: '确认' },
    cancelButtonText: { type: String, default: '取消' }
  },
  data() {
    return {
      centerDialogVisible: this.showLog
    }
  },
  watch: {
    showLog(nVal) {
      this.centerDialogVisible = nVal
    },
    centerDialogVisible(newV) {
      if (!newV) {
        this.$emit('update:showLog', false)
      }
    }
  }
}
</script>
<style scoped>
.center {
  height: 70vh;
  width: 100%;
  overflow: auto;
}
</style>
