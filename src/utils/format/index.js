Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

const format = {
  toDate: (date, pattern) => {
    console.log(typeof date)
    if (typeof date === 'string' && date.split('-').length >= 3) {
      return date
    }
    if (!pattern) {
      pattern = 'yyyy-MM-dd'
    }
    date = format.parseDate(date)
    return date.format(pattern)
  },
  parseDate: (str) => {
    return new Date(str)
  }
}

export default format
