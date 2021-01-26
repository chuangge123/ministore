// components/Tabs/Tabs.js
Component({
  /**
   * 接收父元素的值
   */
  properties: {

    tabs:{
      type:Array
    }
    

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件
    handleItemTap(e){
      // 获取点击的索引
      const {index}=e.currentTarget.dataset;
      // 触发父组件事件
      this.triggerEvent("tabsItemChange",{index});
    }
    
    

  }
})
