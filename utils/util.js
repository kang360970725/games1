import Vue from 'vue'
let showModalFn = function (text) {
  $('.showMsgModal').show()
  $('.showMsgModal span').text(text)
  setTimeout(function () {
    $('.showMsgModal').hide()
  }, 2800)
}

Vue.prototype.$modal = showModalFn

export default ({})
