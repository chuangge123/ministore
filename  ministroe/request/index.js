// 解决多个异步请求，加载条关闭不同步的问题。
let ajaxTime=0;
export const request=(params)=>{
  ajaxTime++;
// 显示加载效果
  wx.showLoading({
    title: '加载中',
    mask:true
  })


  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
  // const baseUrl="http://ministore.com:8766";
               // 参数前者为成功时的回调函数，后者反之。
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTime--;
        // 关闭正在等待的图标
        if(ajaxTime===0){
          wx.hideLoading();
        }
      }
    })
  })
}