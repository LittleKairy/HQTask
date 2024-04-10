import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    user: null, // 存储登录后的用户的信息
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    const postData = {
      loginId: userInfo.username.trim(),
      loginPwd: userInfo.password,
      captcha: userInfo.captcha,
      remeber: userInfo.checked ? 7 : 0,
    };
    console.log(postData);
    return new Promise((resolve, reject) => {
      login(postData)
        .then((response) => {
          console.log(response, typeof response);
          if (typeof response === "object") {
            const { data } = response;
            // console.log(data);
            if (data) {
              // commit("SET_TOKEN", data.token);
              // setToken(data.token);
              commit("SET_USER", data);
              resolve(data);
            } else {
              reject(response);
            }
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  // 根据token恢复登录状态
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          if (typeof response === "string") {
            // 未登录或者token过期
            reject(JSON.parse(response).msg);
          } else {
            // 登录成功，存储用户信息
            const { data } = response;
            if (!data) {
              return reject("Verification failed, please Login again.");
            }

            // const { name, avatar } = data;

            // commit("SET_NAME", name);
            // commit("SET_AVATAR", avatar);

            commit("SET_USER", data);
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    removeToken(); // must remove  token  first
    resetRouter();
    commit("RESET_STATE");

    // return new Promise((resolve, reject) => {
    //   logout()
    //     .then(() => {
    //       removeToken(); // must remove  token  first
    //       resetRouter();
    //       commit("RESET_STATE");
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // remove token
  // 重新获取token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
