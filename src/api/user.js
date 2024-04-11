import { removeUser } from "@/utils/auth";
import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}

// 这里登出时目前不记录在服务器，只是删除本地token
export function logout() {
  // return request({
  //   url: "/vue-admin-template/user/logout",
  //   method: "post",
  // });
  removeUser();
}

// export function getInfo() {
//   // return request({
//   //   url: "/vue-admin-template/user/info",
//   //   method: "get",
//   //   params: { token },
//   // });
//   const resp = request({
//     url: "/api/admin/whoami",
//     method: "get",
//   });
//   // console.log("getInfo>>>>", resp);
//   return resp;

//   // 没有响应或者登录过期，返回字符串
//   // 成功登录，返回对象
// }
