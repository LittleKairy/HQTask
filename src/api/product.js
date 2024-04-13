import { getUsername } from "@/utils/auth";
import request from "@/utils/request";

// "cusip": "CUSIP",
// "productName": "Product Name",
// "productDescription": "Product Description",
// "position": 100,
// "startingValue": 1000,
// "bidValue": 1200,
// "minimumBidIncrement": 10,
// "auctionDeadline": "2024-04-30 12:00:00",
// "ranking": "3/5"
export function getProducts() {
  const username = getUsername();
  return request({
    url: "/product/list",
    method: "post",
    data : {
      username : username,
    },
  });

  //前端测试用例
  // return new Promise((resolve) => {
  //   resolve({
  //     code: 0,
  //     msg: "Success",
  //     data: [
  //       {
  //         cusip: "CUSIP",
  //         productName: "Product Name",
  //         productDescription: "Product Description",
  //         position: 100,
  //         startingValue: 1000,
  //         bidValue: 1200,
  //         minimumBidIncrement: 10,
  //         auctionDeadline: "2024-04-30 12:00:00",
  //         ranking: "3/5",
  //       },
  //       {
  //         cusip: "CUSIPaaa",
  //         productName: "Product Name",
  //         productDescription: "Product Description",
  //         position: 100,
  //         startingValue: 1000,
  //         bidValue: 1200,
  //         minimumBidIncrement: 10,
  //         auctionDeadline: "2024-04-30 12:00:00",
  //         ranking: "3/5",
  //       },
  //     ],
  //   });
  // });
}

export function addProduct(data) {
  return request({
    url: '/product/add',
    method: "post",
    data,
  });
  // return new Promise((resolve) => {
  //   resolve({
  //     code: 0,
  //     msg: "Success",
  //     data: {
  //       productName: "Default Product Name",
  //       productDescription: "Default Product Description",
  //       startingValue: 100.0,
  //       minimumBidIncrement: 10.0,
  //       auctionDeadline: "2024-04-10T12:00:00Z",
  //     },
  //   });
  // });
}

// export function getDefaultProduct(cusip) {
//   // return request({
//   //   url: `/product/default-data/${cusip}`,
//   //   method: "get",
//   // });
//   return {
//     code: 0,
//     msg: "Success",
//     data: {
//       productName: "Default Product Name",
//       productDescription: "Default Product Description",
//       startingValue: 100.0,
//       minimumBidIncrement: 10.0,
//       auctionDeadline: "2024-04-10T12:00:00Z",
//     },
//   };
// }

// 传入cusip获取对应表单数据 ？？？ 暂时不用
// export function getProduct(cusip) {
//   // return request({
//   //   url: `/bid/create/${cusip}`,
//   //   method: "get",
//   // });
//   return {
//     code: 0,
//     msg: "Success",
//     data: {
//       cusip: "CUSIP",
//       productName: "Default Product Name",
//       productDescription: "Default Product Description",//       startingValue: 100.0,
//       minimumBidIncrement: 10.0,
//       auctionDeadline: "2024-04-10T12:00:00Z",
//     },
//   };
// }

// 商品ID：cusip (字符串)
// 用户名：username (字符串)
// 竞价数据：bidAmount (数字)
export function addBid(data) {
  return request({
    url: `/bid/submit?cusip=${data.cusip}&username=${data.username}&bidAmount=${data.bidAmount}`,
    method: "post",
    data
  });
  // return new Promise((resolve) => {
  //   resolve({
  //     code: 0,
  //     msg: "Success",
  //     data: null,
  //   });
  // });
}

export function updateBid(data) {
  return request({
    url: `/bid/submitedit?cusip=${data.cusip}&username=${data.username}&bidAmount=${data.bidAmount}`,
    method: "post",
    data
  });
  // return new Promise((resolve) => {
  //   resolve({
  //     code: 0,
  //     msg: "Success",
  //     data: null,
  //   });
  // });
}

export function cancleBid(data) {
  return request({
    url: `/bid/delete/${data.cusip}?username=${data.username}`,
    method: "delete",
  });
  // return new Promise((resolve) => {
  //   resolve({
  //     code: 0,
  //     msg: "Success",
  //     data: null,
  //   });
  // });
}

export function getBidDetails(cusip) {
  return request({
    url: `/bid/details/${cusip}`,
    method: "get",
  });
  // return new Promise((resolve) => {
  //   resolve({
  //     code: 0,
  //     msg: "Success",
  //     data: {
  //       productInfo: {
  //         cusip: "CUSIP",
  //         productName: "Product Name",
  //         productDescription: "Product Description",
  //       },
  //       userBidsList: [
  //         {
  //           username: "username1",
  //           bidAmount: 1200,
  //           ranking: "1/5",
  //         },
  //         {
  //           username: "username2",
  //           bidAmount: 1100,
  //           ranking: "2/5",
  //         },
  //       ],
  //     },
  //   });
  // });
}

export function getUserHistory() {
  const username = getUsername();
  console.log("username", username);
  return request({
    url: '/transaction/history',
    method: "post",
    data: {
      username : username,
    },
  });
  // return new Promise((resolve) => {
  //   resolve({
  //     code: 0,
  //     msg: "Success",
  //     data: [
  //       {
  //         username: "username",
  //         cusip: "CUSIP",
  //         transactionTime: "2024-04-07 15:30:00",
  //         transactionType: "Buy",
  //         productName: "Product Name",
  //         quantity: 10,
  //         amount: 1000,
  //       },
  //     ],
  //   });
  // });
}


