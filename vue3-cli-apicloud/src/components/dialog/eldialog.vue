<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      width="120vh"
      align-center
      :title="title"
      :show-close="showClose"
      :fullscreen="fullscreen"
      :close-on-click-modal="closeOnClickModal"
      :destroy-on-close="destroyOnClose"
      :lock-scroll="true"
      center
    >
      <div class="center">
        <slot name="center"></slot>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <slot name="footer"></slot>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'MyDialog',
  props: {
    title: { type: String },
    closeOnClickModal: { type: Boolean, default: true },
    showClose: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    destroyOnClose: { type: Boolean, default: true },
    showLog: { type: Boolean, default: false }
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
  height: 65vh;
  width: 100%;
  overflow: auto;
}
</style>
