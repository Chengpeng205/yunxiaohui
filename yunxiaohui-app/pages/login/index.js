import { 
  loginRequest
 } from "../../api/main"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      stuId:'',  //学号
      password:'', //密码
      saveCount:true,  //是否记住账号，默认选中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     this.initAccount()
  },

  //初始化账号
initAccount(){
   const accountCache = wx.setStorageSync("account")
   if(accountCache){
     this.setData({
       ...accountCache
     })
   }
},

//登录
  login(){
    const that=this
    const postData = {
      stuId: that.data.stuId,
      password: that.data.password
    }
    wx.showLoading({
      title:'登录中',
    })

    loginRequest(postData).then(res => {
      wx.hideLoading()
      if(res.code == -1){
        wx.showToast({
          title: res.msg,
          icon:'none' 
        })
        return
      }
      if (that.data.saveCount) {
        wx.setStorageSync('account', postData)
      }
      wx.setStorageSync('token', res.cookie)
      if(that.data.saveCount){
        wx.setStorageSync('accoint', postData)
      }
      wx.showToast({
        title: '登录成功',
        icon:'none'    //none不需要图标
      })
      setTimeout(() =>{
        wx.redirectTo({
          url: '/pages/index/index',
        })
      },1500);
    })

  },
  
  switchStatus(){
    this.setData({
      saveCount: !this.data.saveCount
    })
  }
})