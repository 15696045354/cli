<template>
  <div id="app">
    <div :class="autoClass" :style="{ height: showVerify ? '450px' : '330px' }">
      <van-nav-bar title="登录" />
      <el-form
        :model="sizeForm"
        :rules="rules"
        :ref="ruleForm"
        label-width="auto"
        label-position="left"
        size="large"
      >
        <div style="width: 90%; margin-left: 5%">
          <el-form-item label="账号" prop="name">
            <el-input v-model="sizeForm.name" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="sizeForm.password" />
          </el-form-item>
          <el-form-item label="验证码" v-if="showVerify">
            <el-row style="width: 100%">
              <el-col :span="3">
                <image-code
                  style="margin-top: 5%"
                  :change="data.change_img_code"
                  :contentWidth="100"
                  @click="changeImageCode"
                  @getCode="backImageCode"
                ></image-code>
              </el-col>
              <el-col :offset="7" :span="14">
                <el-input v-model="verifyCode" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label=" ">
            <el-checkbox-group v-model="sizeForm.type">
              <el-checkbox size="large" label="记住密码" name="type" />
              <el-checkbox size="large" label="自动登录" name="type" />
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              style="width: 96%; left: 2%; position: absolute; margin-top: 20%"
              type="primary"
              @click="submitForm(ruleForm)"
              >提交</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from 'vue'
import { mapMutations, mapState } from 'vuex'
import { FormInstance, FormRules } from 'element-plus'
import md5 from 'js-md5'
import imageCode from '@/components/imageCode/index.vue'
export default {
  name: 'LoginIndex',
  components: { imageCode },
  data() {
    return {
      verifyCode: '',
      loginCount: 0,
      showVerify: false,
      loading: false,
      sizeForm: {
        name: '',
        password: '',
        type: []
      },
      ruleForm: 'ruleForm',
      autoClass: 'loginH',
      rules: {
        name: [{ required: true, message: '账号必填！', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填!', trigger: 'blur' }]
      }
    }
  },
  computed: mapState(['routerId']),
  created() {
    try {
      this.upRouterId('home')
      this.loadClass(window.api.winWidth)
    } catch (e) {
      window.apiready = () => {
        this.loadClass(window.api.winWidth)
      }
    }
  },
  mounted() {
    window.onresize = () => {
      return (async () => {
        this.loadClass(window.api.winWidth)
      })()
    }
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
    if (loginInfo) {
      this.sizeForm.name = loginInfo.userId
      this.sizeForm.password = this.util.decryptByDES(
        loginInfo.password,
        'amait.cc'
      )
    }
  },
  setup() {
    const data = reactive({
      change_img_code: false, // 刷新验证码
      img_code: '' // 加密后的验证码值
    })
    // 刷新验证码操作
    const changeImageCode = () => {
      data.change_img_code = !data.change_img_code
    }
    // 接收组件返回加密后的验证码值
    const backImageCode = (code) => {
      data.img_code = code
    }
    return {
      changeImageCode,
      backImageCode,
      data
    }
  },
  methods: {
    ...mapMutations(['upRouterId']),
    async onSubmit() {
      this.loading = true
      if (this.showVerify) {
        if (md5(this.verifyCode) !== this.data.img_code) {
          this.loading = false
          return this.util.fail('验证码错误！')
        }
      }
      const data = await this.request.post(
        'security/authentication/terminalUserAuthentication',
        {
          userId: this.sizeForm.name, //账号
          password: this.util.encryptByDES(this.sizeForm.password, 'amait.cc'),
          modeType: 'pad',
          workcenterId: '10000010',
          deviceId: 1234568 //登录电子设备
        }
      )
      if (data.code === '-1') {
        this.loginCount++
        if (this.loginCount >= 5) {
          this.showVerify = true
        }
        this.util.fail(data.data)
      } else {
        this.loginCount = 0
        this.showVerify = false
        this.saveItem(this.sizeForm.type, data.data)
        this.upRouterId('main')
      }
      this.loading = false
    },
    saveItem(item, loginInfo) {
      if (item.length == 0) {
        return
      }
      item.forEach((i) => {
        if (i === '记住密码') {
          localStorage.setItem('loginInfo', loginInfo)
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          return false
        }
      })
    },
    loadClass(winWidth) {
      console.log('winWidth' + winWidth)
      this.autoClass = winWidth > 680 ? 'loginH' : 'loginS'
    }
  }
}
</script>
<style scoped>
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}
.loginH {
  width: 400px;
  background-color: white;
  box-shadow: 0 0 1px #999;
  top: 30%;
  left: 40%;
  position: absolute;
  filter: alpha(opacity=50);
  -moz-opacity: 0.8;
  -khtml-opacity: 0.8;
  opacity: 0.8;
}

.loginS {
  width: 330px;
  background-color: white;
  box-shadow: 0 0 1px #999;
  top: 25%;
  left: 10%;
  position: absolute;
  filter: alpha(opacity=50);
  -moz-opacity: 0.8;
  -khtml-opacity: 0.8;
  opacity: 0.8;
}

.el-radio-group {
  margin-right: 12px;
}
</style>
