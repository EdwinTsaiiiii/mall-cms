import MyRequest from "@/service";

export function getEntireRoles() {
  return MyRequest.post({
    url: "/role/list"
  });
}

export function getEntireDepartment() {
  return MyRequest.get({
    url: "/department/list"
  });
}
