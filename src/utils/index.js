function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatSongTime (duration) {
  let min = parseInt(duration / 60) < 10 ? '0' + parseInt(duration / 60) : parseInt(duration / 60)
  let sec = parseInt(duration % 60) < 10 ? '0' + parseInt(duration % 60) : parseInt(duration % 60)
  return `${min}:${sec}`
}

export function timeToSec (time) {
  if (!time) {
    return 0
  }
  const h = parseInt(time.substr(0, 1))
  const m = parseInt(time.substr(1, 2))
  const s = parseInt(time.substr(3, 5))
  return (h * 10 + m) * 60 + s
}

export function formatCommentNum (num) {
  if (num < 1000) {
    return num
  } else if (num >= 1000 && num < 10000) {
    return '999+'
  } else if (num >= 10000 && num < 100000) {
    return '1w+'
  } else if (num >= 100000 && num < 1000000) {
    return '10w+'
  } else if (num >= 1000000 && num < 10000000) {
    return '100w+'
  }
}
export function formaterTime (time) {
  let currentTime = new Date(time)
  let year = currentTime.getFullYear()
  let month = currentTime.getMonth() + 1
  let day = currentTime.getDate()
  return year + '年' + month + '月' + day + '日'
}
export default {
  formatNumber,
  formatTime,
  formatSongTime,
  timeToSec,
  formatCommentNum,
  formaterTime
}
