const request = require('superagent')
const charset = require('superagent-charset')
const cheerio = require('cheerio')
const auth = require('auth-tjcu')
charset(request)

var base_url = 'http://j.tjcu.edu.cn'

exports.login = async (req, res) => {
  const result = await auth('http://j.tjcu.edu.cn/caslogin.jsp', {
    username: req.body.stuid,
    password: req.body.pwd
  })
  req.session.user = result.cookies;
  res.json(result);
}

exports.info = (req, res) => {
  var url = base_url + '/xjInfoAction.do?oper=xjxx'
  request.get(url)
    .charset('gb2312')
    .set("Cookie", req.session.user)
    .then(response => {
      const infos = cheerio('.fieldName+td', response.text).map((i, el) => {
        return cheerio(el).text().replace(/[\ \ \n\r\t]/g, '')
      }).get()
      res.json({
        state: 1,
        infos: {
          stuid: infos[0], //学号
          name: infos[1], //姓名
          ID_number: infos[5], //身份证号
          sex: infos[6], //性别
          minorities: infos[10], //民族
          hometown: infos[11], //籍贯
          politics: infos[13], //政治面貌
          middle_school: infos[15], //毕业中学
          candidate_number: infos[18], //高考考生号
          foreign_language: infos[19], //外语语种
          enrollment_date: infos[23], //入学日期
          college: infos[24], //系所
          major: infos[25], //专业
          grade: infos[27], // 年级
          class: infos[28], //班级
          graduation_date: infos[47], //毕业日期
          type: infos[48] //培养层次
        }
      })
    })
    .catch(err => {
      res.json({ state: 0, msg: err })
    })
}

exports.password = (req, res) => {
  var url = base_url + '/bks_login2.ChangePass'
  request.post(url)
    .charset('gb2312')
    .set("Cookie", req.session.user)
    .type('form')
    .send({
      p_oldpass: req.body.p_oldpass,
      p_newpass1: req.body.p_newpass1,
      p_newpass2: req.body.p_newpass2
    })
    .end((err, result) => {
      if (err) return res.json({ state: 0, err: err })
      var $ = cheerio.load(result.text)
      if($('.t').text() === '\n你已经改变了你的密码!\n') {
        res.json({ state: 1 })
        return
      }
      res.json({ state: 0, err: $('.t').text() })
    })
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.json({ state: 1 })
}
