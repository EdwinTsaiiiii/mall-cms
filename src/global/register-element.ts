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
  ElDropdown,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElOption,
  ElSelect,
  ElDropdownMenu,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard,
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
  ElDropdown,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDropdownMenu,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
]

export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
