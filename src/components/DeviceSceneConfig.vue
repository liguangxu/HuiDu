<template>
  <div class="content">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="3">场景列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="openAddScene">新 增
        </el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
         <el-table :data="sceneTableData" stripe border>
            <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
            <el-table-column prop="name" label="场景名称" width="240" align="center"></el-table-column>
            <el-table-column prop="image" label="场景图" align="center"></el-table-column>
            <el-table-column :context="_self" inline-template label="操作" width="300" align="center">
                  <div>
                    <el-button size="small" type="info" @click="viewSpots(row._id, row.name)">查看监测点</el-button>
                    <el-button size="small" type="primary" @click="openUpdateScene(row)">修改</el-button>
                    <el-button size="small" type="danger" @click="openDeleteScene(row)">删除</el-button>
                  </div>
              </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <br><br>

    <el-dialog title="新增场景" v-model="addSceneFormVisible" class="content">
      <el-form :model="addSceneForm" label-position="left" enctype="multipart/form-data">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="场景名称：" :label-width="formLabelWidth">
              <el-input v-model="addSceneForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属公司：" :label-width="formLabelWidth">
              <el-select v-model="addSceneForm.companyid" :disabled="companyOptions === null" 
              :placeholder="nowCompanyname">
                <el-option v-for="item in companyOptions" :label="item.companyname" :value="item.companyid">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="场景图：" :label-width="formLabelWidth">
              <el-upload :action="imgUploadUrl" type="drag" :before-upload="handleUploadBefore" 
              :on-error="handleUploadError" :on-success="handleUploadSuccess"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSceneFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddScene">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改场景" v-model="updateSceneFormVisible" class="content">
      <el-form ref="updateSceneForm" :model="updateSceneForm" label-position="left">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="场景名称：" :label-width="formLabelWidth">
              <el-input v-model="updateSceneForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属公司：" :label-width="formLabelWidth">
              <el-select v-model="updateSceneForm.companyid" :disabled="companyOptions === null" 
                :placeholder="nowCompanyname">
                <el-option v-for="item in companyOptions" :label="item.companyname" :value="item.companyid">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="场景图：" :label-width="formLabelWidth">
              <el-upload :action="imgUploadUrl" type="drag" :before-upload="handleUploadBefore" 
              :on-error="handleUploadError" :on-success="handleUploadSuccess" :default-file-list="fileList"
              :thumbnail-mode="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSceneFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateScene">确 定</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="3">监测点列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="openAddSpot">新 增
        </el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
         <el-table :data="spotTableData" stripe border>
        <el-table-column prop="spotid" label="监测点位" width="180" align="center"></el-table-column>
        <el-table-column prop="spotlocation" label="监测点名称" width="360" align="center"></el-table-column>
        <el-table-column prop="sceneid" label="所属场景" width="240" align="center"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" align="center">
          <div>
            <el-button size="small" type="danger" @click="openDeleteSpot(row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
    </el-row>

    <el-dialog title="新增监测点" v-model="addSpotFormVisible" class="content">
      <el-form :model="addSpotForm" label-position="left">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="监测点名称：" :label-width="formLabelWidth">
              <el-input v-model="addSpotForm.spotlocation"></el-input>
            </el-form-item>
            <el-form-item label="监测点位：" :label-width="formLabelWidth">
              <el-input v-model="addSpotForm.spotid"></el-input>
            </el-form-item>
            <el-form-item label="所属场景：" :label-width="formLabelWidth">
              <el-input v-model="addSpotForm.sceneid" disabled :placeholder="nowScenename"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSpotFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSpot">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改监测点" v-model="updateSpotFormVisible" class="content">
      <el-form :model="updateSpotForm" label-position="left">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="监测点名称：" :label-width="formLabelWidth">
              <el-input v-model="updateSpotForm.name"></el-input>
            </el-form-item>
            <el-form-item label="监测点位：" :label-width="formLabelWidth">
              <el-input v-model="updateSpotForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属场景：" :label-width="formLabelWidth">
              <el-input v-model="updateSpotForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSpotFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSpotFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>  
</template>
<script>
import Util from '../utils/util.js'

export default {
  data () {
    return {
      fileList: [],
      sceneImg: { name: '', url: '' },
      nowCompanyname: this.getNowCompanyname(),
      nowScenename: '',
      imgUploadUrl: Util.deviceApi.sceneImgUpload,
      active: 0,
      addSceneFormVisible: false,
      updateSceneFormVisible: false,
      addSpotFormVisible: false,
      updateSpotFormVisible: false,
      addSceneForm: {
        name: '',
        companyid: '',
        image: ''
      },
      updateSceneForm: {
        _id: '',
        name: '',
        companyid: '',
        image: ''
      },
      deleteSceneForm: {
        _id: ''
      },
      deviceSpotGetBody: {
        _id: ''
      },
      addSpotForm: {
        sceneid: '',
        spotid: '',
        spotlocation: ''
      },
      updateSpotForm: {
        index: '',
        name: ''
      },
      deleteSpotForm: {
        _id: ''
      },
      formLabelWidth: '120px',
      formAlignRight: {
        index: '',
        name: ''
      },
      sceneTableData: [],
      spotTableData: [],
      deviceSceneGetBody: { companyid: '' },
      companyOptions: []
    }
  },
  methods: {
    getNowCompanyname () {
      return Util.getNowCompanyname()
    },
    setNowScenename () {
      this.$set(this, 'nowScenename', Util.getDeviceSelectedScenename())
    },
    setNowSceneid () {
      this.$set(this.addSpotForm, 'sceneid', Util.getDeviceSelectedSceneid())
    },
    getCompanys () {
      let level = Util.getNowLevel()
      if (level === 0) {
        this.$http.get(Util.deviceApi.companyGet)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取公司数据失败', response.data.data)
            } else {
              this.$set(this, 'companyOptions', response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取公司数据失败', '网络错误，请稍后重试')
          })
      } else {
        this.$set(this, 'companyOptions', null)
      }
    },
    getScenes () {
      let level = Util.getNowLevel()
      if (level !== 0) {
        let nowUser = Util.localStorageGet('nowUser')
        let companyid = nowUser === null ? null : nowUser.companyid
        this.$set(this.deviceSceneGetBody, 'companyid', companyid)
      } else {
        this.$set(this.deviceSceneGetBody, 'companyid', '')
      }
      console.log(this.deviceSceneGetBody)
      this.$http.post(Util.deviceApi.sceneGet, this.deviceSceneGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取场景数据失败', response.data.data)
            } else {
              this.$set(this, 'sceneTableData', response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取场景数据失败', '网络错误，请稍后重试')
          })
    },
    openAddScene () {
      this.addSceneFormVisible = true
      this.getCompanys()
      this.$set(this.addSceneForm, 'name', '')
      this.$set(this.addSceneForm, 'companyid', '')
      this.$set(this.addSceneForm, 'image', '')
    },
    openUpdateScene (row) {
      this.updateSceneFormVisible = true
      this.getCompanys()
      this.$set(this.updateSceneForm, '_id', row._id)
      this.$set(this.updateSceneForm, 'name', row.name)
      let level = Util.getNowLevel()
      if (level !== 0) {
        this.$set(this.updateSceneForm, 'companyid', '')
      }
      this.$set(this.sceneImg, 'name', row.name)
      this.$set(this.sceneImg, 'url', row.image)
      this.fileList.push(this.sceneImg)
      this.$set(this.updateSceneForm, 'image', row.image)
    },
    handleAddScene () {
      let level = Util.getNowLevel()
      if (level !== 0) {
        this.$set(this.addSceneForm, 'companyid', Util.getNowCompanyid())
      }
      console.log(this.addSceneForm)
      this.$http.post(Util.deviceApi.sceneAdd, this.addSceneForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('添加场景失败', response.data.data)
            } else {
              this.getScenes()
            }
          })
          .catch(function (response) {
            Util.showError('添加场景失败', '网络错误，请稍后重试')
          })
      this.addSceneFormVisible = false
    },
    handleUpdateScene () {
      let level = Util.getNowLevel()
      if (level !== 0) {
        this.$set(this.updateSceneForm, 'companyid', Util.getNowCompanyid())
      }
      console.log(this.updateSceneForm)
      this.$http.post(Util.deviceApi.sceneUpdate, this.updateSceneForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('修改场景失败', response.data.data)
            } else {
              this.getScenes()
            }
          })
          .catch(function (response) {
            Util.showError('修改场景失败', '网络错误，请稍后重试')
          })
      this.$refs.updateSceneForm.resetFields()
      this.updateSceneFormVisible = false
    },
    openDeleteScene (row) {
      this.$confirm('此操作将永久删除该场景, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.deleteScene(row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteScene (row) {
      this.$set(this.deleteSceneForm, '_id', row._id)
      this.$http.post(Util.deviceApi.sceneDelete, this.deleteSceneForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('删除场景失败', response.data.data)
            } else {
              this.getScenes()
            }
          })
          .catch(function (response) {
            Util.showError('删除场景失败', '网络错误，请稍后重试')
          })
    },
    handleUploadBefore (file) {
      console.log(file)
    },
    handleUploadError (err, response, file) {
      console.log(err)
      console.log(response.data.data)
    },
    handleUploadSuccess (response, file, fileList) {
      this.$set(this.addSceneForm, 'image', response.data)
    },
    viewSpots (_id, name) {
      Util.setDeviceSelectedScene(_id, name)
      this.$set(this.deviceSpotGetBody, '_id', _id)
      this.$http.post(Util.deviceApi.spotGet, this.deviceSpotGetBody)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取监测点数据失败', response.data.data)
            } else {
              this.$set(this, 'spotTableData', response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取监测点数据失败', '网络错误，请稍后重试')
          })
    },
    openAddSpot () {
      this.addSpotFormVisible = true
      this.setNowScenename()
      this.$set(this.addSpotForm, 'sceneid', '')
      this.$set(this.addSpotForm, 'spotlocation', '')
      this.$set(this.addSpotForm, 'spotid', '')
    },
    openDeleteSpot (row) {
      this.$confirm('此操作将永久删除该监测点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.deleteSpot(row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteSpot (row) {
      let sceneid = row.sceneid
      this.$set(this.deleteSpotForm, '_id', row._id)
      this.$http.post(Util.deviceApi.spotDelete, this.deleteSpotForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('删除监测点失败', response.data.data)
            } else {
              this.viewSpots(sceneid, null)
            }
          })
          .catch(function (response) {
            Util.showError('删除监测点失败', '网络错误，请稍后重试')
          })
    },
    handleAddSpot () {
      this.setNowSceneid()
      this.$http.post(Util.deviceApi.spotAdd, this.addSpotForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('添加监测点失败', response.data.data)
            } else {
              this.viewSpots(response.data.data.sceneid, null)
            }
          })
          .catch(function (response) {
            Util.showError('添加监测点数据失败', '网络错误，请稍后重试')
          })
      this.addSpotFormVisible = false
    }
  },
  mounted: function () {
    console.log('get Scenes Data here-------')
    this.getScenes()
  }
}
</script>

<style scoped>
.content {
  font-size: 20px;
  color: #8492A6;
  margin-top: 20px;
  margin-left: 200px;
  text-align: left;
  /*position: fixed;*/
  /*background-color: #20A0FF;*/
}
.submit-button {
  width: 100%;
}
</style>