<template lang="pug">
#pass
  mu-content-block
    .table-wrap(v-for="grade in grades")
      mu-sub-header.grade-table-title {{grade.title}}
      mu-table(:fixedHeader="true", :showCheckbox="false")
        mu-thead
          mu-tr
            mu-th 课程号
            mu-th 课序号
            mu-th 课程名
            mu-th 英文课程名
            mu-th 学分
            mu-th 课程属性
            mu-th 总成绩
        mu-tbody
          mu-tr(v-for="course in grade.courses")
            mu-td {{course.id}}
            mu-td {{course.order}}
            mu-td {{course.name}}
            mu-td {{course.name_en}}
            mu-td {{course.credit}}
            mu-td {{course.property}}
            mu-td {{course.grade}}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  activated () {
    this.getScore()
  },
  data () {
    return {
      grades: []
    }
  },
  methods: {
    ...mapActions([
      'toogleSnackbar'
    ]),
    getScore () {
      this.$http
        .get('/request/grade/passing')
        .then((data) => {
          if (data.body.state === 1) {
            this.grades = data.body.grades
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
.grade-table-title
  text-align center

#pass
  .mu-th, .mu-td
    overflow hidden
    text-align center
    padding-left 0
    padding-right 0
  .width-fix
    width 36%
</style>
