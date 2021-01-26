// pages/cart/index.js
import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWX.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
// 页面加载动作
  onShow: function () {
    // 1.获取缓存中的收货地址信息
    const address=wx.getStorageSync("address");
    // 2.获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    // 3.计算全选,为节约性能。将其写在forEach里面
    // const allChecked = cart.length?cart.every(v => v.checked):false;
    // 4.总价格，总数量 计算 这里给封装到setCart函数中
    this.setData({
      address
    })
    this.setCart(cart);
    
  },
   // 点击收货地址响应事件,调用小程序的API 
  async handleChooseAddress(){
    try {
      //1 获取权限 状态
      // const res1 = await getSetting();
      // const scopeAddress = res1.authSetting["scope.address"];
      //2 判断权限状态
      // if(scopeAddress===false){
      //   //3 先诱导用户打开授权页面
      //   await openSetting();
      // }

      //4 调用获去地址的api
      let address = await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // console.log(address);
      //5 存入发哦缓存中
      wx.setStorageSync("address", address);
      
    } catch (error) {
      console.log(error);
    }
  },
  //设置购物车状态 重新计算 价格等等
  setCart(cart){
    //1 计算全选
    //const allChecked = cart.length?cart.every(v => v.checked):false;
    let allChecked=true;
    //1 总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
      }else{
        allChecked=false;
      }
    })
    //判断数组为空
    allChecked = cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", cart);
  },
  // 商品复选框,选中与取消选中事件
  handleItemChange(e){
    //1.获取被修改信息的商品ID
    const goods_id=e.currentTarget.dataset.id;
    //2.获取购物车数组
    let {cart}=this.data;
    // 3.找到被修改的数组
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    // 对该对象的取反
    cart[index].checked=!cart[index].checked;
  // 4.把购物车数据重新设置回缓存、data中
    this.setCart(cart);
    
  },
  //全选复选框 全选or反选事件
  handleItemAllCheck(){
    //1 获取data中的数据
    let {cart,allChecked} = this.data;
    //2 修改allChecked的值
    allChecked = !allChecked;
    //3 循环修改购物车数组
    cart.forEach(v => v.checked=allChecked);
    //4 把修改厚的值到data和缓存
    this.setCart(cart);
  },
  //商品数量编辑，点击+-号的事件处理
  handleItemNumEdit(e){
    //获取传递过来的参数
    const {operation,id}=e.currentTarget.dataset;
    //获取购物车数组
    let {cart}=this.data;
    // 找到需要修改的商品索引
    const index=cart.findIndex(v=>v.goods_id===id);
    // 判断是否删除
    if(cart[index].num===1&&operation===-1){
      //当数量为1且用户点击-号，进行弹窗提示
      wx.showModal({
        title: '提示',
        content: '确定不要我了吗',
        // 将success变为箭头函数
        success:(res) =>{
          if(res.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }
        }
      })

    }else{
      // 点击+号，修改数量
    cart[index].num+=operation;
    // 设置会缓存和data中
    this.setCart(cart);

    }
    
  },
  // 点击结算触发事件
  handlePay(){
    const {address}=this.data;
    const {totalNum}=this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none'        
      })
      return;
    }
    // 判断没有选择商品
    if(totalNum===0){
      // 判断没有选择商品
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
        
      })
      return;
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
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


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})