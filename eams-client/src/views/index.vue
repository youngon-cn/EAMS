<template lang="pug">
#eams
  mu-content-block
    mu-list
      router-link(to="/user")
        mu-list-item(title="学籍信息")
          mu-icon(slot="left", value="assignment_ind")
      router-link(to="/grade/pass")
        mu-list-item(title="及格成绩")
          mu-icon(slot="left", value="school")
      router-link(to="/grade/fail")
        mu-list-item(title="不及格成绩")
          mu-icon(slot="left", value="sentiment_dissatisfied")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'getUser'
    ])
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="stylus">
</style>
