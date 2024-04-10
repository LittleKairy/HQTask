export default (timestamp) => {
  const date = new Date(+timestamp);

  const year = date.getFullYear().toString().padStart(4, "0");
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");

  var hour = date.getHours().toString().padStart(2, "0");
  var minute = date.getMinutes().toString().padStart(2, "0");
  var second = date.getSeconds().toString().padStart(2, "0");

  const weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const week = weekArr[date.getDay()];

  return `${year}-${month}-${day} ${hour}:${minute}:${second} ${week}`;
};
