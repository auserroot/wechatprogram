// pages/home/home.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    url_disc: "../../images/disc.png",
    url_player_bar: "../../images/player_bar.png",
    url_item: "",
    id: "",
    getImgUrl: "",
    getSongUrl: "",
    songName: "",
    singer: "",
    active: false,
  },
  //audio组件按钮失效解决方法
  audio_btn: function () {
    if (this.data.active) {
      this.audioCtx.pause();
    } else {
      this.audioCtx.play();
    }
  },
  //播放
  audioPlay: function () {
    this.audioCtx.play();
    this.setData({
      active: true,
    });
  },
  // 暂停
  audioPause: function () {
    this.audioCtx.pause();
    this.setData({
      active: false,
    });
  },
  // 快进14秒
  audio14: function () {
    this.audioCtx.seek(14);
  },
  // 回到最前方
  audioStart: function () {
    this.audioCtx.seek(0);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    // getSongUrl
    wx.request({
      url: "https://apimusic.linweiqin.com/song/url?id=" + options.id,
      method: "get",
      header: {
        "content-type": "application/json",
      },
      success(res) {
        // console.log(res);
        that.setData({
          getSongUrl: res.data.data[0].url,
        });
        console.log(that.data.getSongUrl);
        // console.log(that.songName, that.singer);
      },
    });
    //getImg
    wx.request({
      url: "https://apimusic.linweiqin.com/song/detail?ids=" + options.id,
      method: "get",
      header: {
        "content-type": "application/json",
      },
      success(res) {
        console.log(res);
        that.setData({
          getImgUrl: res.data.songs[0].al.picUrl,
          url_item: res.data.songs[0].al.picUrl,
        });
        console.log(that.data.getImgUrl);
      },
    });
    this.setData({
      id: options.sid,
      singer: options.singer,
      songName: options.songName,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext("music");
    this.audioCtx.setSrc(this.getSongUrl);
    this.audioPlay();
  },

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
