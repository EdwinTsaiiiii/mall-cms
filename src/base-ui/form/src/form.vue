<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <el-form :label-width="labelWidth" class="self-form">
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col v-bind="colLayout">
          <el-form-item
            v-if="!item.isHidden"
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
                <el-option
                  v-for="option in item.options || []"
                  :label="option.title"
                  :key="option.value"
                  :value="option.value"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  {{ option.title }}
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <!-- v-bind将所有额外属性进行绑定 -->
              <el-date-picker
                :placeholder="item.placeholder"
                style="width: 100%"
                v-bind="item.otherOptions"
                :model-value="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, watch, ref, computed } from 'vue'
import { IFormItem } from '../index'
export default defineComponent({
  props: {
    // v-model双向绑定，传入modelValue，但不要直接修改modelValue
    // 一般情况，不要去修改传入的props的属性（违反了单向数据流的原则）
    // 如果要修改传入的props，应该采用emit通知父组件的回调函数进行修改，而不是在组件中直接修改
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      // 写默认值，如果是对象或数组，要把它写成箭头函数
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 通过计算属性配合emit回调通知父组件修改属性
    // const formData = computed({
    //   get: () => props.modelValue,
    //   set: (newValue) => {
    //     // 注意这样写，set没有被调用
    //     // console.log('---------')
    //     // emit('update:modelValue', newValue)
    //   }
    // })
    // 浅拷贝一份
    const formData = ref({ ...props.modelValue })
    // 自己监听数据的改变，才是真正实现双向绑定
    // 发生改变再执行emit回调
    // watch(
    //   formData,
    //   (newValue) => {
    //     console.log(newValue)
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )
    // 值发生改变后，就发出去这个事件
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      formData,
      handleValueChange
    }
  }
})
</script>
<style scoped lang="less">
.self-form {
  padding-top: 20px;
  .form-item {
    padding: 5px 30px;
  }
}
</style>
