import Vue from 'vue'

export default new Vue({
  data () {
    return {
      userApi: {
        login: this.getBaseApi() + 'user/login',
        get: this.getBaseApi() + 'user/get',
        add: this.getBaseApi() + 'user/add',
        delete: this.getBaseApi() + 'user/delete',
        update: this.getBaseApi() + 'user/update',
        sceneGet: this.getBaseApi() + 'user/getCompanyScenes',
        companyGet: this.getBaseApi() + 'user/getAllCompany',
        oneCompanyGet: this.getBaseApi() + 'system/getCompanyByCompanyid',
        spotGet: this.getBaseApi() + 'user/getSceneSpots',
        currentDataGet: this.getBaseApi() + 'user/getusercurrentdata',
        currentSpotGet: this.getBaseApi() + 'user/querycurrentspot'
      },
      realtimeApi: {
        get: this.getBaseApi() + 'realtime/get',
        control: this.getBaseApi() + 'realtime/control'
      },
      historyApi: {
        enter: this.getBaseApi() + 'history/enter',
        search: this.getBaseApi() + 'history/search',
        sceneListGet: this.getBaseApi() + 'history/getscene'
      },
      deviceApi: {
        sceneGet: this.getBaseApi() + 'device/scene/getSceneByCompanyAndLevel',
        sceneAdd: this.getBaseApi() + 'device/scene/add',
        sceneUpdate: this.getBaseApi() + 'device/scene/update',
        sceneDelete: this.getBaseApi() + 'device/scene/delete',
        sceneImgUpload: this.getBaseApi() + 'device/scene/uploadFile',
        companyGet: this.getBaseApi() + 'user/getAllCompany',
        spotGet: this.getBaseApi() + 'device/spot/get',
        spotAdd: this.getBaseApi() + 'device/spot/add',
        spotDelete: this.getBaseApi() + 'device/spot/delete',
        channelGet: this.getBaseApi() + 'device/channel/get',
        channelSpotGet: this.getBaseApi() + 'device/channel/getSpot',
        channelAdd: this.getBaseApi() + 'device/channel/add',
        dataTypeGet: this.getBaseApi() + 'system/getDataType'
      },
      systemApi: {
        companyGet: this.getBaseApi() + 'system/getCompany',
        companyImgUpload: this.getBaseApi() + 'system/uploadCompanyFile',
        companyAdd: this.getBaseApi() + 'system/addCompany',
        companyUpdate: this.getBaseApi() + 'system/updateCompany',
        iconGet: this.getBaseApi() + 'system/getIcon',
        iconAdd: this.getBaseApi() + 'system/iconAdd',
        iconUpdate: this.getBaseApi() + 'system/iconUpdate',
        iconDelete: this.getBaseApi() + 'system/iconDelete',
        iconUpload: this.getBaseApi() + 'system/uploadIconFile',
        companyGetByUrl: this.getBaseApi() + 'system/getCompanyByUrl'
      }
    }
  },
  methods: {
    getBaseApi () {
      // return 'api/'
      // return 'http://localhost:8888/'
      return '/'
    },
    showError (title, info) {
      this.$notify.error({
        title: title,
        message: info,
        offset: 100
      })
    },
    showInfo (title, info) {
      this.$notify.info({
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
      if (nowSceneid === null && sceneList === null) {
        this.localStorageSet('nowSceneid', null)
      }
      if (nowSceneid === null && sceneList != null && sceneList.length > 0) {
        this.localStorageSet('nowSceneid', sceneList[0]._id)
      }
      if (nowSceneid !== null && sceneList === null) {
        this.localStorageSet('nowSceneid', nowSceneid)
      }
    },
    getNowSceneid () {
      return this.localStorageGet('nowSceneid')
    },
    getRealtimeFirstSceneid () {
      return this.localStorageGet('nowUser').sceneList[0]._id
    },
    isInRealtimeScenes (sceneid) {
      let list = this.localStorageGet('nowUser').sceneList
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id === sceneid) {
          return true
        }
      }
      return false
    },
    getRealtimeSceneImg (sceneid) {
      let list = this.localStorageGet('nowUser').sceneList
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id === sceneid) {
          return list[i].image
        }
      }
      return ''
    },
    getNowLevel () {
      return this.localStorageGet('nowUser').level
    },
    getNowCompanyid () {
      return this.localStorageGet('nowUser').companyid
    },
    getNowCompanyname () {
      return this.localStorageGet('nowUser').companyname
    },
    setDeviceSelectedScene (id, name) {
      if (id !== null) {
        this.localStorageSet('deviceSelectedSceneid', id)
      }
      if (name !== null) {
        this.localStorageSet('deviceSelectedScenename', name)
      }
    },
    getDeviceSelectedScenename () {
      return this.localStorageGet('deviceSelectedScenename')
    },
    getDeviceSelectedSceneid () {
      return this.localStorageGet('deviceSelectedSceneid')
    },
    setCompanyScenes (sceneList) {
      if (sceneList !== null) {
        this.localStorageSet('companySceneList', sceneList)
      }
    },
    getCompanyScenes () {
      return this.localStorageGet('companySceneList')
    },
    setFactors (factorList) {
      if (factorList !== null) {
        this.localStorageSet('factorList', factorList)
      }
    },
    getFactors () {
      return this.localStorageGet('factorList')
    },
    setSelectedSpots (list) {
      this.localStorageSet('selectedSpots', list)
    },
    getSelectedSpots () {
      return this.localStorageGet('selectedSpots')
    },
    setCurrentFactor (name) {
      this.localStorageSet('currentFactor', name)
    },
    getCurrentFactor () {
      let result = this.localStorageGet('currentFactor')
      if (result === null) {
        result = ''
      }
      return result
    }
  }
})
