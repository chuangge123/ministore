// pages/search/index.js
import { request } from '../../request/index.js';
// 支持es7的async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inpValue:''
  },
  timeId:-1,
  //输入框的值改变就会触发事件
  handleInput(e){
    // 1.获取输入框的值
    const {value}=e.detail
        //检查合法性
    if(!value.trim()){
      this.setData({
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    //准备放请求获取数据
    clearTimeout(this.timeId); //清除定时器  输入时不停清除定时器，直到停止输入。
    //开启定时器
    this.timeId = setTimeout(() => {
      this.qsearch(value);
    },1000)
  },
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },
  handleCancer(){
    this.setData({
      inpValue:'',
      isFocus:false,
      goods:[]
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})