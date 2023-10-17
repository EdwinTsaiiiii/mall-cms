import { defineStore } from "pinia";
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from "@/service/login/login";
import type { IAccount } from "@/types/login/login";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from "@/global/constant";
import router from "@/router";
import type { ILoginState } from "@/types/login/login";
// @ts-ignore
import { ElMessage } from "element-plus";
import { addRoutesWithMenu } from "@/router";
import useMainStore from "@/store/main/main";

const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: []
  }),
  actions: {
    // 登录操作
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account);
      // 如果账号密码填写错误
      if (loginResult.code !== 1) {
        ElMessage.error("账号或密码错误");
        return;
      }
      const { id, token } = loginResult.data;
      this.token = token;

      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 3.获取用户的详细信息
      const userInfoResult = await getUserInfoById(id);
      const userInfo = userInfoResult.data;
      this.userInfo = userInfo;
      localCache.setCache(USER_INFO, userInfo);

      // 4.获取用户权限菜单
      const userMenusResult = await getUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      this.userMenus = userMenus;
      localCache.setCache(USER_MENUS, userMenus);

      // 5.加载路由
      addRoutesWithMenu(this.userMenus);

      // 6.进行页面跳转
      router.push("/main");

      ElMessage.success("登录成功");
    },

    // 加载所有数据
    loadLocalDataAction() {
      this.token = localCache.getCache(LOGIN_TOKEN);
      this.userInfo = localCache.getCache(USER_INFO);
      this.userMenus = localCache.getCache(USER_MENUS);

      // 加载role和department
      const mainStore = useMainStore();
      mainStore.fetchEntireData();

      // 加载动态路由
      addRoutesWithMenu(this.userMenus);
    }
  }
});
export default useLoginStore;
