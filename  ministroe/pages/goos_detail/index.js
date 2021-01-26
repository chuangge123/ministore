// pages/goos_detail/index.js
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
/* 
  点击轮播图，预览大图
  1.给轮播图绑定事件
  2.调用小程序API previewImage
*/
/* 
  点击加入购物车
  1.绑定点击事件
  2.获取缓存中的购物车数据 数组格式
  3.判断 当前的商品是否存在于购物车
  4.若已经存在 修改购物车数据 执行购物车数量++ 重新将购物车数据添回缓存中
  5.不存在于购物车数组中 直接购物车数组添加一个新元素 新元素带上购买数量的属性 num
  6.弹出提示
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}

  },
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    
    this.getGoodsDetail(goods_id);
    
  },

  // 获取页面数据
  // https://api-hmugo-web.itheima.net/api/public/v1/goods/detail/index?goods_id=43986
  async getGoodsDetail(goods_id){
    // const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    var url='../../data/goos_detail/'+goods_id+'.js'
    var postsData = require(url)
    const goodsObj=postsData.goodsList[0]
    // console.log(goodsObj)
    this.GoodsInfo=goodsObj;    
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },
  handlePervewImage(e){
    // 1.先构造需要预览的图片数组
    // console.log("点击")
  
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    // 2.接收传递过来的图片url(获取点击目标的数据)
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd(){
   // 1.获取缓存中的购物车数据并 转型为数组
   let cart = wx.getStorageSync("cart") || [];
   // 2.判断 商品对象是否存在于购物车数组中
   let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
   console.log(index)
   if(index===-1){
    //  3 不存在 第一次添加
     this.GoodsInfo.num=1;
     this.GoodsInfo.checked=true;
     cart.push(this.GoodsInfo);
   } else{
    //  4.已群在 执行num++
      cart[index].num++;
   }
  //  5.把购物车重新添回缓存中
   wx.setStorageSync('cart', cart);
  //  6.弹窗提示
   wx.showToast({
     title: '加入成功',
     icon: 'success',
     mask:true,
   })
  },
    //点击加入购物车
    // handleCartAdd(){
    //   console.log("gouwuc");
    //   //1 获取缓存中的购物车数组
    //   let cart = wx.getStorageSync("cart") || [];
    //   //2 判断商品对象是否存在数组中
    //   let index = cart.findIndex(v => v.goods_id===this.goodsInfo.goods_id);//遍历
    //   console.log(index);
    //   if(index===-1){
    //     //3 不存在 第一次添加
    //     this.GoodsInfo.num=1;
    //     this.GoodsInfo.checked=true;
    //     cart.push(this.GoodsInfo);
    //   }else{
    //     //4 已经存在 执行num++
    //     cart[index].num++;
    //   }
    //   //5 把购物车重新添加回缓存中
    //   wx.setStorageSync("cart", cart);
    //   //6 弹窗提是
    //   wx.showToast({
    //     title: '加入购物车成功',
    //     icon: 'success',
    //     mask: true
    //   });
    // },
  
  
})