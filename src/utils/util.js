import Vue from 'vue'

export default new Vue({
  data () {
    return {
      userApi: {
        login: this.getBaseApi() + 'user/login',
        get: this.getBaseApi() + 'user/get'
      },
      realtimeApi: {
        get: this.getBaseApi() + 'realtime/get'
      },
      historyApi: {
        enter: this.getBaseApi() + 'history/enter',
        search: this.getBaseApi() + 'history/search'
      },
      deviceApi: {
        sceneGet: this.getBaseApi() + 'user/getCompanyScenes',
        sceneAdd: this.getBaseApi() + 'device/scene/add'
      }
    }
  },
  methods: {
    getBaseApi () {
      return 'http://localhost:8888/'
    },
    showError (title, info) {
      this.$notify.error({
        title: title,
        message: info,
        offset: 100
      })
    },
    localStorageGet (key) {
      let storage = window.localStorage
      let result = storage.getItem(key)
      if (!(result === null || result === undefined)) {
        result = JSON.parse(result)
      } else {
        result = null
      }
      return result
    },
    localStorageSet (key, value) {
      var storage = window.localStorage
      storage.setItem(key, JSON.stringify(value))
    },
    setNowSceneid (nowSceneid, sceneList) {
      // 初次登陆，sceneList不为空
      if (nowSceneid === null && sceneList != null && sceneList.length > 0) {
        this.localStorageSet('nowSceneid', sceneList[0]._id)
      }
      if (nowSceneid != null && sceneList === null) {
        this.localStorageSet('nowSceneid', nowSceneid)
      }
    },
    getNowSceneid () {
      return this.localStorageGet('nowSceneid')
    }
  }
})
