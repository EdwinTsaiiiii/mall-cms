<script setup lang="ts">
import type { IMockData } from "@/mock/types/types";
import {
  computed,
  nextTick,
  onUnmounted,
  reactive,
  ref,
  watchEffect
} from "vue";

// 如何将虚拟滚动的逻辑优雅抽离封装成hook
const props = defineProps<{
  dataList: Array<IMockData>;
}>();

// 列表HTMLElementDom
const ulRef = ref<any>(null);

// 屏幕高度
const screenHeight = document.documentElement.clientHeight;

// 数据计算项
const data = reactive<any>({
  // 列表第一项的高度（起始高度）
  initH: 0,
  // 一行的高度
  itemH: 125,
  // 屏幕范围内能显示的个数
  displayCount: 6,
  // 列表起始值(滚动到第几项)
  startIdx: 1
});

// 截取可视区的数据
const datalist_mock = computed(() => {
  // 计算可视区域最后那条数据的索引
  let endIdx = data.startIdx + data.displayCount;
  // 触底的情况
  if (endIdx >= props.dataList.length) endIdx = props.dataList.length;
  // 返回只截取所计算的可视区域的数据
  return props.dataList.slice(data.startIdx, endIdx).map((v, k) => {
    v.idx = data.startIdx + k + 1;
    return v;
  });
});

// 节流函数
function throttle(fn, delay) {
  let timer;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      window.requestAnimationFrame(fn);
      timer = null;
    }, delay);
  };
}

// 滚动触发事件
function scrollHandler() {
  // 当前滚动的高度，注意需要获取最外层的el-main，否则拿不到scrollTop
  const curScrollTop = document.querySelector(".el-main").scrollTop;
  // 开始滚动
  if (curScrollTop > data.initH) {
    // 计算需要再渲染多少行数据
    const addCount = Math.floor((curScrollTop - data.initH) / data.itemH);
    // 设置列表总高度 = 一行高度 * 行数
    const listH = data.itemH * props.dataList.length;
    // 计算被滚没了的高度
    const offsetH = data.startIdx * data.itemH;
    // 猛拉滚动条导致高度溢出并且数据无法渲染（这个暂时不知道怎么处理）
    // 还有对白屏的处理
    if (addCount > props.dataList.length) {
      alert("请勿过快拉动滚动条！");
      location.reload();
    }
    // 添加样式，不断调整padding和高度
    ulRef.value.style.setProperty("padding-top", `${addCount * data.itemH}px`);
    ulRef.value.style.setProperty("height", `${listH - offsetH}px`);
    // 更新起始索引
    data.startIdx = addCount;
  } else {
    // 回滚
    ulRef.value.style.setProperty("padding-top", "0px");
    data.startIdx = 0;
  }
}

// 初始化监听事件
watchEffect(() => {
  if (props.dataList.length > 0) {
    nextTick(() => {
      // 列表距离顶部距离
      data.initH =
        ulRef.value.getBoundingClientRect().top +
        document.querySelector(".el-main").scrollTop;
      console.log("initH", data.initH);
      // 计算每行高度
      data.itemH = ulRef.value.children[0].offsetHeight;
      console.log("itemH", data.itemH);
      // 计算屏幕内能显示的行数
      data.displayCount = Math.ceil(screenHeight / data.itemH);
      console.log("displayCount", data.displayCount);
      // 起始高度即是列表总长
      ulRef.value.style.setProperty(
        "height",
        `${data.itemH * props.dataList.length}px`
      );
      window.removeEventListener("scroll", throttle(scrollHandler, 30), true);
      window.addEventListener("scroll", throttle(scrollHandler, 30), true);
    });
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <ul ref="ulRef" class="ul-list" id="ul-list">
    <li v-for="item in datalist_mock" :key="item.idx" :data-idx="item.idx">
      <div class="item-box">
        <div class="item-flex">
          <div class="item-box-item">名称：{{ item.title }}</div>
          <div class="item-box-item">地址：{{ item.location }}</div>
          <div class="item-box-item">价格：{{ item.price }}</div>
        </div>
        <div class="item-flex">
          <div class="item-box-item">面积：{{ item.area }}</div>
          <div class="item-box-item">朝向：{{ item.orientation }}</div>
          <div class="item-box-item">楼层：{{ item.floor }}</div>
        </div>
        <div class="item-flex">
          <div class="item-box-item">
            水电：{{ item.water }} | {{ item.electricity }}
          </div>
          <div class="item-box-item">设施：{{ item.facility }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
.item-box {
  width: calc(100% - 40px);
  background-color: var(--day-bg-color1);
  margin: 20px 0;
  padding: 10px 20px;
  display: flex;
  height: 95px;
}
.item-box-item {
  margin: 10px 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
