import { request } from "../../request/index.js";

Page({


  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],    
    catesList:[],
    fllorList:[] 
  },

  /**
   * 加载页面触发获取轮播图等事件
   */
  onLoad: function (options) {
    //没有用promise封装时请求接口的方法如下
    // wx.request({
    //   url: 'http://ministore.com:8766/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // })

    // 改进后

    // this.getSwiperList();
    // this.getCateList();
    // this.getFloorList();
    this.getSwiperList1();
    this.getFloorList1();

    
  },
  // 读取文件获取轮播图数据
  getSwiperList1(){
    var postsData = require('../../data/index_swiper.js')
    this.setData({
      swiperList:postsData.postList
    })
  },
   // 读取文件获楼层数据
  getFloorList1(){
    var fllorData = require('../../data/index_fllorList.js')
    this.setData({
      fllorList:fllorData.FllorList
    })
  },
  
  // 请求后台获取轮播图方法
  getSwiperList(){
    request({url: "/home/swiperdata"})
    .then(result=>{
              this.setData({
          swiperList:result
        })
    })
  }, 
  // 请求后台获取分类导航数据
  getCateList(){
    request({url: "/home/catitems"})
    .then(result=>{
              this.setData({
          catesList:result
        })
    })
    
  },


  // 请求后台获取楼层数据

  getFloorList(){
    request({url: "/home/floordata"})
    .then(result=>{
              this.setData({
          fllorList:result
        })
    })
    
  },

})