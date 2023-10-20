import MyRequest from "../../index";

/**
 * 各页面通用接口
 */

/**
 * 查
 * @param pageName 页面名称
 * @param queryInfo 参数
 */
export function getPageListData(pageName: string, queryInfo: any) {
  return MyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  });
}

/**
 * 增
 * @param pageName
 * @param dataInfo
 */
export function newPageData(pageName: string, dataInfo: any) {
  return MyRequest.post({
    url: `/${pageName}`,
    data: dataInfo
  });
}

/**
 * 删
 * @param pageName
 * @param id
 */
export function deletePageData(pageName: string, id: number) {
  return MyRequest.delete({
    url: `/${pageName}/${id}`
  });
}

/**
 * 改
 * @param pageName
 * @param id
 * @param userInfo
 */
export function editPageData(pageName: string, id: number, userInfo: any) {
  return MyRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo
  });
}
