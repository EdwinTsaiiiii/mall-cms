<template>
  <self-table
    v-bind="contentTableConfig"
    :listData="dataList"
    :listCount="dataCount"
    v-model:page="pageInfo"
  >
    <!-- header中的插槽 -->
    <template #headerHandler>
      <el-button size="default" v-if="isCreate" @click="handleNewClick">
        新建{{ contentTableConfig.title.replace('列表', '') }}
      </el-button>
    </template>
    <!-- 列中插槽 -->
    <template #createAt="scope">
      <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
    </template>
    <template #updateAt="scope">
      <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
    </template>
    <template #handler="scope">
      <el-button
        icon="edit"
        size="small"
        type="text"
        v-if="isUpdate"
        @click="handleEditClick(scope.row)"
      >
        编辑
      </el-button>
      <el-button
        icon="delete"
        size="small"
        type="text"
        v-if="isDelete"
        @click="handleDeleteClick(scope.row)"
      >
        删除
      </el-button>
    </template>
    <!-- 其他各页面特有的插槽 -->
    <template
      v-for="item in otherPropSlots"
      :key="item.prop"
      #[item.slotName]="scope"
    >
      <template v-if="item.slotName">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </template>
  </self-table>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import selfTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermission'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    selfTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 获取数据操作
    // 双向绑定pageinfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    // 注意setup只会调用一次
    // 发送网络请求，此处代码会执行很多次
    const getPageData = (queryInfo: any = {}) => {
      // 没有权限直接返回
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    // 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 删除操作
    const handleDeleteClick = (item: any) => {
      ElMessageBox.confirm(
        '您确定删除序号为' + `${item.id}` + '的数据？',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then((res) => {
        if (res === 'confirm') {
          store.dispatch('system/deletePageDataAction', {
            pageName: props.pageName,
            id: item.id
          })
        }
        if (res === 'cancel') return
      })
    }

    // 新建操作
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    // 编辑操作
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      getPageData,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>
<style scoped></style>
