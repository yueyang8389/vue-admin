import TipTemplate from './tip.vue'

const myModal = {}

myModal.install = function (Vue, options) {
  const Modal = Vue.extend(TipTemplate)

  const instance = new Modal()

  let ele = document.querySelector('.my-tip')

  instance.$mount(ele)

  document.body.appendChild(instance.$el)

  Vue.prototype.$Tip = {
    success (opt) {
      const {
        title,
        content,
        onOk
      } = opt
      instance.show = true
      instance.title = title || '温馨提示'
      instance.type = 'success'
      instance.content = content
      instance.onOk = onOk
    },
    info (opt) {
      const {
        title,
        content,
        onOk
      } = opt
      instance.show = true
      instance.title = title || '温馨提示'
      instance.type = 'info'
      instance.content = content
      instance.onOk = onOk
    },
    error (opt) {
      const {
        title,
        content,
        onOk
      } = opt
      instance.show = true
      instance.title = title || '温馨提示'
      instance.type = 'error'
      instance.content = content
      instance.onOk = onOk
    },
    confirm (opt) {
      const {
        title,
        content,
        onOk
      } = opt
      instance.show = true
      instance.title = title || '温馨提示'
      instance.type = 'confirm'
      instance.content = content
      instance.onOk = onOk
    }
  }
}

export default myModal
