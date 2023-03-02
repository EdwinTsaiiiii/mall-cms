<template>
  <div class="table-header">
    <slot name="table-header">
      <div class="title">{{ title }}</div>
      <div class="handler">
        <slot name="headerHandler"></slot>
      </div>
    </slot>
  </div>
  <div class="self-table">
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <template v-for="propItem in propList || []" :key="propItem.prop">
        <el-table-column
          v-bind="propItem"
          align="center"
          show-overflow-tooltip="true"
        >
          <template #default="scope">
            <!-- scope.row某一行的数据 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <div class="footer" v-if="showFooter">
    <slot name="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[10, 20, 30]"
        :pager-count="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listCount"
        background
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array<any>,
      requird: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array<any>,
      requird: true
    },
    showIndexColumn: {
      type: Boolean,
      required: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style scoped lang="less">
el-table {
  z-index: 0;
}
.table-header {
  display: flex;
  padding: 10px 0 15px;
  justify-content: space-between;
  .title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
  }
}
.footer {
  padding: 15px 0;
  display: flex;
  flex-direction: row-reverse;
}
</style>
