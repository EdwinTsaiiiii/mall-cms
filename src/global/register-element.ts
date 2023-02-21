import { App } from 'vue'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElHeader,
  ElMain,
  ElAside,
  ElContainer,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
} from 'element-plus'

const components = [
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElHeader,
  ElMain,
  ElAside,
  ElContainer,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
]

export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
