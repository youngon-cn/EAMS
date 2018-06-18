<template lang="pug">
#app
  mu-appbar(:title="title")
    mu-icon-button(
      icon="arrow_back",
      slot="left",
      @click="$router.back()",
      v-show="$route.path !== '/' && $route.path !== '/login'")
    mu-icon-button(icon="more_vert", ref="button", slot="right", @click="togglePopover()", v-show="user.name")
  transition(:name="transitionName")
    keep-alive
      router-view.child-view
  mu-popover(:trigger="trigger", :open="showPopover", @close="togglePopover")
    mu-menu(@itemClick="operate")
      mu-menu-item(title="修改密码")
      mu-menu-item(title="注销")
  mu-snackbar(v-if="snackbar.show", :message="snackbar.message", action="关闭", @actionClick="toogleSnackbar()")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  mounted () {
    this.$nextTick(async () => {
      this.trigger = this.$refs.button.$el
      var result = await this.getUser()
      if (result.state !== 1) {
        this.$router.replace('/login')
      }
    })
  },
  data () {
    return {
      trigger: null,
      showPopover: false,
      title: '',
      transitionName: 'slide-left'
    }
  },
  methods: {
    ...mapActions([
      'getUser',
      'toogleSnackbar'
    ]),
    togglePopover () {
      this.showPopover = !this.showPopover
    },
    operate (menuItem) {
      if (menuItem.title === '修改密码') {
        this.showPopover = false
        this.$router.push('/password')
      }
      if (menuItem.title === '注销') {
        this.$http
          .get('/request/logout')
          .then((data) => {
            if (data.body.state === 1) {
              this.getUser()
              this.toogleSnackbar('注销成功')
              this.showPopover = false
              this.$router.push('/login')
            } else {
              this.toogleSnackbar('注销失败，请稍后再试')
            }
          }, (err) => {
            this.toogleSnackbar('注销失败，请稍后再试')
            console.log(err)
          })
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'snackbar'
    ])
  },
  watch: {
    '$route': function (to, from) {
      this.title = to.meta.title
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="stylus">
.pull-right
  float right
  &:after
    content "."
    display block
    height 0
    clear both
    visibility hidden

.fade-enter-active, .fade-leave-active
  transition opacity .5s ease

.fade-enter, .fade-leave-active
  opacity 0

.child-view
  position absolute
  top 56px
  bottom 0
  left 0
  right 0
  overflow auto
  transition all .3s cubic-bezier(.55,0,.1,1)
  @media (min-width: 480px)
    top 64px
  .mu-content-block
    height 100%

.slide-left-enter, .slide-right-leave-active
  opacity 0
  transform translate(100%, 0)

.slide-left-leave-active, .slide-right-enter
  opacity 0
  transform translate(-100%, 0)

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
</style>
