import MyRequest from "../../index";

/**
 * 各页面通用接口
 */
export function getPageListData(pageName: string, queryInfo: any) {
  return MyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  });
}

export function newPageData(pageName: string, dataInfo: any) {
  return MyRequest.post({
    url: `/${pageName}`,
    data: dataInfo
  });
}

export function deletePageData(pageName: string, id: number) {
  return MyRequest.delete({
    url: `/${pageName}/${id}`
  });
}

export function editPageData(pageName: string, id: number, userInfo: any) {
  return MyRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo
  });
}
