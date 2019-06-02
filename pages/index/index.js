import {translate} from '../../utils/api.js'

const app =  getApp()

Page({
  data:{
      query: '',
      hideClearIcon: true,
      result: [],
      curLang: {}

  },
    onLoad: function (options) {
        console.log('lonload..')
        
        if (options.query) {
            this.setData({ query: options.query, result:Array( {dst:options.result} )})
        }
        console.log(this.data)

    },
    onShow: function () {
        if (this.data.curLang.lang !== app.globalData.curLang.lang) {
            this.setData({ curLang: app.globalData.curLang })
            
        }

    },
    onInput: function (e) {
        this.setData({ 'query': e.detail.value })
        if (this.data.query.length > 0) {
            this.setData({ 'hideClearIcon': false })
        } else {
            this.setData({ 'hideClearIcon': true })
        }

        console.log('focus')
    },
    onTapClose: function () {
        this.setData({ query: '', hideClearIcon: true,result:[] })
    },
    onConfirm: function () {
        if (!this.data.query) return
        translate(this.data.query, { from: 'auto', to: this.data.curLang.lang })
            .then(res => {
                
                this.setData({ 'result': res.trans_result })
                const cur_result = { query: this.data.query, result: res.trans_result[0].dst }
                let tmp = wx.getStorageSync('history') || []
    
                const history = []
                tmp.map((i)=>{
                    if(i.query !== cur_result.query){
                        console.log(i.query, cur_result.query)
                        history.push(i)
                    }
                })
                console.log('history')
                console.log(history)
                history.unshift(cur_result)
                
                
                history.length = history.length > 25 ? 25 : history.length
                wx.setStorageSync('history', history)
            }).catch((error)=>{
                console.log(error)
        })
    }

})
