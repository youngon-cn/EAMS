<template lang="pug">
#user
  mu-content-block
    mu-list(v-if="user.name")
      mu-list-item.user_info(:title="user.name", afterText="姓名")
      mu-list-item.user_info(:title="user.sex", afterText="性别")
      mu-list-item.user_info(:title="user.stuid", afterText="学号")
      mu-list-item.user_info(:title="user.college", afterText="学院")
      mu-list-item.user_info(:title="user.major", afterText="专业")
      mu-list-item.user_info(:title="user.class", afterText="班级")
      mu-list-item.user_info(:title="user.minorities", afterText="民族")
      mu-list-item.user_info(:title="user.hometown", afterText="籍贯")
      mu-list-item.user_info(:title="user.politics", afterText="政治面貌")
      mu-list-item.user_info(:title="user.middle_school", afterText="毕业中学")
      mu-list-item.user_info(:title="user.foreign_language", afterText="外语语种")
      mu-list-item.user_info(:title="user.ID_number", afterText="身份证号")
      mu-list-item.user_info(:title="user.candidate_number", afterText="高考考生号")
      mu-list-item.user_info(:title="user.enrollment_date", afterText="入学日期")
      mu-list-item.user_info(:title="user.graduation_date", afterText="毕业日期")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="stylus">
.user_info .mu-item
  padding 8px
</style>
