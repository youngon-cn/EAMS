<template lang="pug">
#login
  mu-content-block
    mu-text-field(v-model="stuid", label="学号", :labelFloat="true", hintText="输入账号", icon="person", :fullWidth="true")
    mu-text-field(v-model="pwd", label="密码", :labelFloat="true", hintText="输入密码", icon="fingerprint", :fullWidth="true", type="password")
    mu-raised-button.pull-right(label="登录", primary, @click="login()")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      stuid: '',
      pwd: ''
    }
  },
  methods: {
    ...mapActions([
      'getUser',
      'toogleSnackbar'
    ]),
    login () {
      const { stuid, pwd } = this
      if (!stuid || !pwd) {
        this.toogleSnackbar('请正确填写表单')
        return
      }
      this.$http
        .post('/request/login', { stuid, pwd })
        .then((data) => {
          if (data.body.state === 1) {
            this.getUser()
            this.toogleSnackbar('登陆成功')
            this.$router.push('/')
          } else {
            this.toogleSnackbar(data.body.msg)
          }
        }, (err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
#login
  width 100%
  overflow-x hidden
</style>
