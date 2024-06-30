import { reactive } from 'vue'

export const alertStore = reactive<{
  open: boolean
  msg: string
  color: string
  show: ({ msg, color }: { msg: string; color: string }) => void
}>({
  open: false,
  color: '',
  msg: '',
  show({ msg, color }) {
    this.open = true
    this.msg = msg
    this.color = color
  }
})
