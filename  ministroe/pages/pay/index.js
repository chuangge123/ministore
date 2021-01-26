import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    //1 获取缓存中收货地址信息
    const address = wx.getStorageSync("address");
    //1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    //1 计算全选
    //const allChecked = cart.length?cart.every(v => v.checked):false;
    //过滤后的购物车数组
    cart=cart.filter(v => v.checked);
    //1 总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v => {
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

})