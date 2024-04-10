const TokenKey = "vue_admin_template_token";

// token的设置

export function getToken() {
  // return Cookies.get(TokenKey);
  return localStorage.getItem("adminToken");
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token);
  return localStorage.setItem("TokenKey", token);
}

export function removeToken() {
  // return Cookies.remove(TokenKey);
  return localStorage.removeItem("adminToken");
}

export function setUsername(username) {
  return localStorage.setItem("username", username);
}

export function removeUser() {
  return localStorage.removeItem("username");
}

export function getUsername() {
  return localStorage.getItem("username");
}
