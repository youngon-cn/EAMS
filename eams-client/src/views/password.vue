<template lang="pug">
#password
  mu-content-block
    mu-text-field(v-model="p_oldpass", label="当前密码", :labelFloat="true", hintText="输入当前密码", icon="fingerprint", :fullWidth="true")
    mu-text-field(v-model="p_newpass1", label="新密码", :labelFloat="true", hintText="输入新密码", icon="blur_on", :fullWidth="true", type="password")
    mu-text-field(v-model="p_newpass2", label="重复新密码", :labelFloat="true", hintText="重复输入新密码", icon="blur_on", :fullWidth="true", type="password")
    mu-raised-button.pull-right(label="提交", primary, @click="modify()")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      p_oldpass: '',
      p_newpass1: '',
      p_newpass2: ''
    }
  },
  methods: {
    ...mapActions([
      'toogleSnackbar'
    ]),
    modify () {
      this.$http
        .post('/request/password', {
          p_oldpass: this.p_oldpass,
          p_newpass1: this.p_newpass1,
          p_newpass2: this.p_newpass2
        })
        .then((data) => {
          if (data.body.state === 1) {
            this.toogleSnackbar('修改成功')
            this.$router.push('/')
          } else {
            this.toogleSnackbar(data.body.msg)
          }
        }, (err) => {
          this.toogleSnackbar(err)
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
</style>
