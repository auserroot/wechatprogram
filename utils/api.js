const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const FORM = "FORM";
const DELETE = "DELETE";

// const baseURL = "https://apimusic.linweiqin.com";
const baseURL = " http://rrafa.icu:3000";

function request(method, url, data) {
  return new Promise(function (resolve, reject) {
    let header = {
      "content-type": "application/json",
    };
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (res.data.errCode == 0) {
          resolve(res);
        } else {
          //其他异常
          reject("运行时错误,请稍后再试");
        }
      },
      fail(err) {
        //请求失败
        reject(err);
      },
    });
  });
}

const getSong = {
  getSong: (data) => request(GET, `/song/url?id=${data}`),
};
const getSearch = {
  getSearch: (data) => request(GET, `/search?keywords=${data}`),
};
const getImg = {
  getImg: (data) => request(GET, `/song/detail?ids=${data}`),
};
const getMv = {
  getMv: (data) => request(GET, `/mv/url?mvid=${data}`),
};
const getConnet = {
  getConnet: (data) => request(GET, `/comment/hot?type=0?id=${data}`),
};
module.exports = {
  getSong: getSong,
  getSearch: getSearch,
  getImg: getImg,
  getMv: getMv,
  getConnet: getConnet,
};
