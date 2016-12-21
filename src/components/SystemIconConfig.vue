<template>
	<div class="content">
	<el-row>
		  <el-col :span="2">&nbsp;</el-col>
		  <el-col :span="3">Icon列表</el-col>
		  <el-col :span="2"><el-button size="large" type="primary" 
		  @click="openAddIconForm">新 增</el-button>
		  </el-col>
		</el-row>
		<br>
	<el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号" width="140" align="center"></el-table-column>
        <el-table-column prop="userdesc" label="监测因子" width="180" align="center"></el-table-column>
        <el-table-column prop="imgurl" label="Icon图片" align="center"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" align="center">
          <div>
            <el-button size="small" type="info" @click="openUpdateIconForm(row)">修改
            </el-button>
            <el-button size="small" type="danger" @click="handleDeleteIcon(row)">删除
            </el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
      </el-row>

      <el-dialog title="新增Icon" v-model="addIconFormVisible">
      <el-form :model="addIconForm" label-position="top" enctype="multipart/form-data">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="监测因子名称">
              <el-input v-model="addIconForm.userdesc"></el-input>
            </el-form-item>
            <el-form-item label="图标大小">
              <el-select v-model="addIconForm.type">
                <el-option v-for="item in typeOptions" :label="item.label" 
                :value="item.value">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Icon图片">
              <el-upload :action="iconUploadUrl" type="drag" :before-upload="handleUploadBefore" 
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
        <el-button @click="addIconFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddIcon">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改Icon" v-model="updateIconFormVisible">
      <el-form :model="updateIconForm" label-position="top" enctype="multipart/form-data">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="监测因子名称">
              <el-input v-model="updateIconForm.userdesc"></el-input>
            </el-form-item>
            <el-form-item label="图标大小">
              <el-input v-model="updateIconForm.type" :placeholder="typeLabel" 
              disabled></el-input>
            </el-form-item>
            <el-form-item label="Icon图片">
              <el-upload :action="iconUploadUrl" type="drag" :before-upload="handleUploadBefore" 
              :on-error="handleUploadError" :on-success="handleUpdateUploadSuccess"
              :thumbnail-mode="true" :default-file-list="updateFileList">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateIconFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateIcon">确 定</el-button>
      </div>
    </el-dialog>

	</div>
</template>

<script>
import Util from '../utils/util.js'

export default {
  data () {
    return {
      tableData: [],
      IconGetBody: '2x',
      addIconFormVisible: false,
      updateIconFormVisible: false,
      addIconForm: {
        userdesc: '',
        type: '',
        imgurl: ''
      },
      updateIconForm: {
        _id: '',
        userdesc: '',
        type: '',
        imgurl: ''
      },
      deleteIconForm: {
        _id: ''
      },
      iconUploadUrl: Util.systemApi.iconUpload,
      updateFileList: [],
      typeLabel: '',
      typeOptions: [{
        label: '1倍大小', value: '1x' },
        { label: '2倍大小', value: '2x' }]
    }
  },
  methods: {
    getTypeLabel (type) {
      if (type === '1x') {
        return '1倍大小'
      } else {
        return '2倍大小'
      }
    },
    getIconData () {
      this.$http.get(Util.systemApi.iconGet)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('获取图标数据失败', response.data.data)
            } else {
              this.$set(this, 'tableData', response.data.data)
            }
          })
          .catch(function (response) {
            Util.showError('获取图标数据失败', '网络断开，请稍后再试')
          })
    },
    openAddIconForm () {
      this.addIconFormVisible = true
    },
    handleAddIcon () {
      this.$http.post(Util.systemApi.iconAdd, this.addIconForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('新增图标失败', response.data.data)
            } else {
              this.addIconFormVisible = false
              this.getIconData()
            }
          })
          .catch(function (response) {
            Util.showError('新增图标失败', '网络断开，请稍后再试')
          })
    },
    openUpdateIconForm (row) {
      this.updateIconFormVisible = true
      this.$set(this.updateIconForm, '_id', row._id)
      this.$set(this.updateIconForm, 'userdesc', row.userdesc)
      this.$set(this.updateIconForm, 'type', row.type)
      this.$set(this.updateIconForm, 'imgurl', row.imgurl)
      this.$set(this, 'typeLabel', this.getTypeLabel(row.type))
      let item = [{ name: 'Icon图片', url: row.imgurl }]
      this.$set(this, 'updateFileList', item)
    },
    handleUpdateIcon () {
      this.$http.post(Util.systemApi.iconUpdate, this.updateIconForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('修改图标失败', response.data.data)
            } else {
              this.updateIconFormVisible = false
              this.getIconData()
            }
          })
          .catch(function (response) {
            Util.showError('修改图标失败', '网络断开，请稍后再试')
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
      console.log(response)
      this.$set(this.addIconForm, 'imgurl', response.data)
    },
    handleUpdateUploadSuccess (response, file, fileList) {
      console.log(response)
      this.$set(this.updateIconForm, 'imgurl', response.data)
    },
    deleteIcon (row) {
      this.$set(this.deleteIconForm, '_id', row._id)
      this.$http.post(Util.systemApi.iconDelete, this.deleteIconForm)
          .then((response) => {
            if (response.data.code === '0') {
              Util.showError('删除图标失败', response.data.data)
            } else {
              this.getIconData()
            }
          })
          .catch(function (response) {
            Util.showError('删除图标失败', '网络错误，请稍后重试')
          })
    },
    handleDeleteIcon (row) {
      this.$confirm('此操作将永久删除该图标, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.deleteIcon(row)
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
    }
  },
  mounted: function () {
    this.getIconData()
  }
}
</script>

<style>
.content {
  font-size: 20px;
  color: #8492A6;
  margin-top: 20px;
  margin-left: 200px;
  text-align: left;
}
</style>