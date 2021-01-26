import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/index.js
Page({

  data: {
    //被点击左侧菜单的数据
    leftMenuList:[],
    //被点击展示页的数据
    rightContent:[],
    //给左侧菜单索引赋值
    currentIndex:0,
    //给子菜单页置顶属性赋值
    scrollTop:0
  },
  // 接收请求数据存在该数组
  cates:[],

  onLoad: function (options) {
    //1获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    //2判断
    if(!Cates){
      //不存在，发送请求获取数据
      this.getCates();
    }else{
      //有旧的的数据，定义过期事件 10s改成5分钟
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();
      }else{
        //可以使用就数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据   适用于所有机型
  //  getCates(){
  //   request({url:"/categories"})
  //   .then(res =>{
  //     this.Cates=res.data.message;
  //     //把接口中的数据存入到本地
  //     wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})
  //     //构建左侧的大菜单数据
  //     let leftMenuList=this.Cates.map(v =>v.cat_name);
  //     //构建右侧的商品数据
  //     let rightContent=this.Cates[0].children;
  //     this.setData({
  //       leftMenuList, 
  //       rightContent
  //     })
  //   })

 

    //使用es7的async await来发送请求
    async getCates(){
    // const res = await request({url:"/categories"})
    // 下面是获取本地数据
    var res = require('../../data/category_cates.js')
    // console.log(res);
    // this.Cates=res
    this.Cates=res.catesList;
    //把接口中的数据存入到本地
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates})
    //构建左侧的大菜单数据
    let leftMenuList=this.Cates.map(v =>v.cat_name);
    //构建右侧的商品数据
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList, 
      rightContent
    })
  },
  // getCates1(){
  //     wx.request({
  //     url: 'http://ministore.com:8766/categories',
  //     success: (result) => {
  //       console.log(result);
  //     }
  //   })
  // },

  //左侧菜单点击事件
  // handleItemTap(e){
  //   const {index}=e.currentTarget.dataset;
  //   //重新给右侧内容数组赋值
  //   // let rightContent=this.Cates[index].children; z这里是配合请求方法的变量
  //   let rightContent=this.cates[index].children;
  //   this.setData({
  //     currentIndex:index,
  //     rightContent:rightContent,
  //     scrollTop:0
  //   })
  // }
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    // console.log(index);
    //重新给右侧内容数组赋值
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent:rightContent,
      scrollTop:0
    })
  }
})