import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, getUsername } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// 白名单，不需要权限就可以进入
const whiteList = ["/login", "/register", "/resetPwd"]; // no redirect whitelist

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  if (getUsername()) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ name: "Login", query: { redirect: to.path } });
      // next(`/login?redirect=${to.path}`); // 记录要到达的目标页面，当login之后直接跳转到目标页面。通过路由参数redirect传递
      NProgress.done();
    }
  }
  // determine whether the user has logged in
  // const hasToken = getToken();

  // if (hasToken) {
  //   // 有token
  //   if (to.path === "/login") {
  //     // if is logged in, redirect to the home page
  //     next({ path: "/" });
  //     NProgress.done();
  //   } else {
  //     // 是否有用户信息
  //     // const hasGetUserInfo = store.getters.name;
  //     const hasGetUserInfo = store.getters.user;
  //     if (hasGetUserInfo) {
  //       next();
  //     } else {
  //       // 没有用户信息但是有token, 使用token获取用户信息
  //       try {
  //         // get user info
  //         await store.dispatch("user/getInfo");
  //         next();
  //       } catch (error) {
  //         // token无效获取不到用户信息，试图重置token，并返回登录界面
  //         // remove token and go to login page to re-login
  //         // await store.dispatch("user/resetToken");
  //         Message.error(error || "Has Error");
  //         next(`/login?redirect=${to.path}`);
  //         NProgress.done();
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next();
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next({ name: "Login", query: { redirect: to.path } });
  //     // next(`/login?redirect=${to.path}`); // 记录要到达的目标页面，当login之后直接跳转到目标页面。通过路由参数redirect传递
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
