const request = require('superagent')
const charset = require('superagent-charset')
const $ = require('cheerio')
charset(request)

var base_url = 'http://j.tjcu.edu.cn'

const getTitle = (i, titleNode) => {
  return $(titleNode).text().replace(/[\ \ \n\r\t]/g, '')
}

const grade = {
  getCourse (i, courseInfoNode) {
    return $(courseInfoNode).text().replace(/[\ \ \n\r\t]/g, '')
  },
  getTermGrade (i, courseNode) {
    var course = $('td', courseNode).map(grade.getCourse).get()
    return {
      id: course[0], //课程号
      order: course[1], //课序号
      name: course[2], //课程名
      name_en: course[3], //英文课程名
      credit: course[4], //学分
      property: course[5], //课程属性
      grade: course[6] //总成绩
    }
  },
  getCourses (content) {
    var _courses = []
    $('.displayTag', content).each((i, termNode) => {
      _courses[i] = $('.odd', termNode).map(grade.getTermGrade).get()
    })
    return _courses
  }
}

const getAbout = (i, aboutNode) => {
  var _about = $(aboutNode).text().match(/\d+\.?(\d)?/g)
  return {
    lowest_credit: _about[0], //最低修读学分
    taked_credit: _about[1], //已修读课程总学分
    taked_course: _about[2], //已修读课程门数
    passed_course: _about[3] //通过课程门数
  }
}

exports.passing = (req, res) => {
  var url = base_url + '/gradeLnAllAction.do?type=ln&oper=qbinfo'
  request.get(url)
    .charset('gb2312')
    .set("Cookie", req.session.user)
    .then(response => {
      var titles = $('.title', response.text).map(getTitle).get()
      var courses = grade.getCourses(response.text)
      var abouts = $('.displayTag+table', response.text).map(getAbout).get()
      var grades = []
      for (var i = 0; i < titles.length; i++) {
        grades[i] = {
          title: titles[i],
          courses: courses[i],
          abouts: abouts[i]
        }
      }
      res.json({ state: 1, grades: grades })
    })
    .catch(err => {
      console.log(err)
      res.json({ state: 0, err: err })
    })
}

exports.failing = (req, res) => {
  var url = base_url + '/gradeLnAllAction.do?type=ln&oper=bjg'
  request.get(url)
    .charset('gb2312')
    .set("Cookie", req.session.user)
    .then(response => {
      var grades = []
      $('table .title', response.text).each((i, titleNode) => {
        grades[i] = {
          title: $(titleNode).text().replace(/[\ \ \n\r\t]/g, '')
        }
      })
      $('.displayTag', response.text).each((i, termNode) => {
        var term_grade = []
        $('.odd', termNode).each((i, courseNode) => {
          var course = []
          $('td', courseNode).each((i, courseInfoNode) => {
            course.push($(courseInfoNode).text().replace(/[\ \ \n\r\t]/g, ''))
          })
          term_grade.push({
            id: course[0], //课程号
            order: course[1], //课序号
            name: course[2], //课程名
            name_en: course[3], //英文课程名
            credit: course[4], //学分
            property: course[5], //课程属性
            grade: course[6] //总成绩
          })
        })
        grades[i].courses = term_grade
      })
      $('.titleTop2+table', response.text).each((i, aboutNode) => {
        var _about = $(aboutNode).text().match(/\d+\.?(\d)?/g)
        grades[i].about = {
          failed_credit: _about[0], //未通过课程学分
          failed_course: _about[1] //尚未通过门数
        }
      })
      res.json({ state: 1, grades: grades })
    })
    .catch(err => {
      res.json({ state: 0, err: err })
    })
}
