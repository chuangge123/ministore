import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: '综合', isActive: true },
      { id: 1, title: '销量', isActive: false },
      { id: 2, title: '价格', isActive: false }
    ],
    goodsList:[],      
  },
  
  // 接口需要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10,
    
  },
  // 总页数  定义全局变量 这样定义
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var Id=options.cid;

    // this.QueryParams.cid=options.cid;
    // this.getGoodsList();
    // this.myShowTimout();
    this.getGoodsList1(Id)
  },
// 设置加载页面时的加载图标
  myShowTimout(){
    wx.showLoading({
      title: '加载中',
    })

    // setTimeout(function(){
    //   wx.hideLoading()
    // },6000)
  },

getGoodsList1(Id){
  var url='../../data/goods_list/'+Id+'.js'
  // console.log(url)
    var postsData = require(url)
    this.setData({
      goodsList:postsData.goodsList
    })
},

  // 获取商品列表数据 请求
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});

    // console.log(res);
    // 获取信息总条数
    const total = res.total;
    //计算出总页数，并进行赋值
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    
    this.setData({
      // 刷新的数据与原来数组的数据进行拼接
      goodsList:[...this.data.goodsList,...res.goods]
    })

    // 加载数据成功后 关闭上拉刷新窗口
    wx.stopPullDownRefresh();
  },



  /**
   * 下拉刷新
   * 
   * 1.触发下拉新事件
   * 2.重置数据数组
   * 3.重置页码设为1
   */
  onPullDownRefresh: function () {
    // this.myPullDownRefresh();
  },
  // 自定义刷新函数
  myPullDownRefresh(){
    // 重置数组
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.QueryParams.pagenum=1;
    // 重新发送请求
    this.getGoodsList();
  },

  /**
   * 上拉加载新数据
   * 
   * 判断是否还有下一页数据、获取到总页数，获取到当前的页码。
   * 总页数=Math.ceil(总条数 / 页容量)
   * 没有数据，给与提示
   * 还有数据，加载下一页
   */
  onReachBottom: function () {
    wx.showToast({
      title: '到底啦~',
    })
    // this.myReachBottom();
  },

  // 自定义加载下一页的方法
  myReachBottom(){
    // 判断是否还有下一页
    if(this.QueryParams.pagenum>=this.totalPages){
      // console.log("没有下一页")
      wx.showToast({
        title: '到底啦~',
      })
    }else{
      // console.log("还有")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleTabsItemChange(e){
    // console.log(e.detail);
    // 获取索引
    const {index}=e.detail;
    // 修改原数据
    let {tabs}=this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 把tabs的值重新赋值
    this.setData({
      tabs
    })
  }

})