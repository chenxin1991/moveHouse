const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getToday = d => {
  d = d ? d : new Date();
  let y = d.getFullYear();
  let m = d.getMonth() * 1 + 1;
  let to = d.getDate();
  return ([y, m, to]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join('-')
}


const maxAppointDate = n => {
  let startDate = getToday();
  let endDate = new Date();
  let s = startDate.split("-");
  let yy = parseInt(s[0]);
  let mm = parseInt(s[1]);
  let dd = parseInt(s[2]);
  endDate.setFullYear(yy);
  endDate.setMonth(mm - 1 + n);
  endDate.setDate(dd);
  return endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate();
}

module.exports = {
  formatTime: formatTime,
  getToday: getToday,
  maxAppointDate: maxAppointDate
}