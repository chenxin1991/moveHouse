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
const showToast=val=>{
  wx.showToast({
    title: `${val}`,
    icon: 'none',
    duration: 2000
  });
}
// 弹窗
function alert(content, title, cb) {
  content = content ? (content + '') : "";
  title = title ? title : "";
  wx.showModal({
    title: title,
    mask: true,
    content: content,
    confirmColor: "#ff3b2f",
    showCancel: false,
    success: function() {
      cb && (typeof cb == 'function') && cb();
    }
  })
}
module.exports = {
  formatTime: formatTime,
  showToast,
  alert
}