import MyRequest from "@/service";

export function getEntireRoles() {
  return MyRequest.post({
    url: "/role/list"
  });
}

export function getEntireDepartment() {
  return MyRequest.post({
    url: "/department/list"
  });
}
