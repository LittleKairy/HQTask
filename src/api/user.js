import { getUsername, removeUser } from "@/utils/auth";
import request from "@/utils/request";

export function login(data) {
  // console.log("login POST");
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

export function logoutResp() {
  console.log("logout POST");
  const username = getUsername();
  console.log("const username:"+username);
  removeUser();
  console.log("const username after remove:"+username);
  return request({
    url: "/user/logout",
    method: "post",
    data: {
      username : username,
    },
  });
  // return Promise;
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
