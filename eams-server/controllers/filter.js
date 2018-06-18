exports.login = (req, res, next) => {
  if (req.session.user) {
  	next()
  } else {
  	res.json({ state : 0, msg: '尚未登录或登录信息失效' })
  }
}
