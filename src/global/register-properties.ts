import { App } from 'vue'
import { formatUTCString } from '@/utils/data-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string, format: string) {
      return formatUTCString(value, format)
    }
  }
}
