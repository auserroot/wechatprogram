// pages/category/category.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "分类",
    getSongsList: [],
    songName: "",
    singer: "",
    mvid: "",
    getSongUrl: "",
    getImgUrl: "",
    getMvUrl: "",
  },
  autoPaly: function (e) {
    this.audioCtx.play();
  },
  autoPause: function (e) {
    this.audioCtx.pause();
  },
  //搜索歌曲
  handleInput: function (e) {
    let that = this;
    // 获取输入框当前value值
    let value = e.detail.value;
    wx.request({
      url: "https://apimusic.linweiqin.com/search?keywords=" + value,
      method: "get",
      header: {
        "content-type": "application/json",
      },
      success(res) {
        console.log(res);
        that.setData({
          getSongsList: res.data.result.songs,
        });
        console.log(that.data.getSongsList);
      },
    });
  },
  // 获取歌曲链接
  playmusic: function (e) {
    // console.log(e);
    console.log(e.currentTarget.dataset);
    let that = this;
    let sid = e.currentTarget.dataset.id;
    let songName = e.currentTarget.dataset.songsname;
    let singer = e.currentTarget.dataset.singer;
    let mvid = e.currentTarget.dataset.mvid || "";
    let getImgUrl = e.currentTarget.dataset.getImgUrl;
    let getSongUrl = e.currentTarget.dataset.getSongUrl;
    // console.log(that.data.sid);

    // getSongUrl
    wx.request({
      url: "https://apimusic.linweiqin.com/song/url?id=" + sid,
      method: "get",
      header: {
        "content-type": "application/json",
      },
      success(res) {
        // console.log(res);
        that.setData({
          sid: sid,
          getSongUrl: res.data.data[0].url,
          songName: songName,
          singer: singer,
          mvid: mvid,
        });
        console.log(that.data.getSongUrl);
        // console.log(that.songName, that.singer);
      },
    });
    //getImg
    wx.request({
      url: "https://apimusic.linweiqin.com/song/detail?ids=" + sid,
      method: "get",
      header: {
        "content-type": "application/json",
      },
      success(res) {
        console.log(res);
        that.setData({
          getImgUrl: res.data.songs[0].al.picUrl,
        });
        console.log(that.data.getImgUrl);
      },
    });
    // // 获取MV链接
    // wx.request({
    //   url: "https://apimusic.linweiqin.com//mv/url?id=" + mvid,
    //   method: "get",
    //   header: {
    //     "content-type": "application/json",
    //   },
    //   success(res) {
    //     // console.log(res);
    //     that.setData({
    //       getMvUrl: res.data.data.url,
    //     });
    //     console.log(that.data.getMvUrl);
    //   },
    // });
    //本地存储传值
    wx.setStorage({
      data: songName,
      key: "songName",
    });
    wx.setStorage({
      data: singer,
      key: "singer",
    });
    // navigate传值
    wx.reLaunch({
      url:
        "../home/home?id=" +
        sid +
        "&songName=" +
        songName +
        "&singer=" +
        singer,
    });

    this.audioCtx = wx.createAudioContext("music");
    this.audioCtx.setSrc(that.getSongUrl);
    this.audioCtx.play();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: "https://apimusic.linweiqin.com/search?keywords='热门'",
      method: "get",
      header: {
        "content-type": "application/json",
      },
      success(res) {
        console.log(res);
        that.setData({
          getSongsList: res.data.result.songs,
        });
        console.log(that.data.getSongsList);
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
