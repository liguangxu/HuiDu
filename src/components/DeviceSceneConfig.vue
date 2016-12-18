<template>
  <div class="content">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="3">场景列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="addSceneFormVisible = true">新 增
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
            <el-table-column :context="_self" inline-template label="操作" width="160" align="center">
                  <div>
                    <el-button size="small" type="primary" @click="sceneEdit()">修改</el-button>
                    <el-button size="small" type="danger" @click="">删除</el-button>
                  </div>
              </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <br><br>

    <el-dialog title="新增场景" v-model="addSceneFormVisible" class="content">
      <el-form :model="addSceneForm" label-position="left">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="场景名称：" :label-width="formLabelWidth">
              <el-input v-model="addSceneForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属公司：" :label-width="formLabelWidth">
              <el-input v-model="addSceneForm.name"></el-input>
            </el-form-item>
            <el-form-item label="场景图：" :label-width="formLabelWidth">
              <el-upload action="//jsonplaceholder.typicode.com/posts/" type="drag" :thumbnail-mode="true">
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
        <el-button type="primary" @click="addSceneFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改场景" v-model="updateSceneFormVisible" class="content">
      <el-form :model="updateSceneForm" label-position="left">
        <el-row>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="20">
            <el-form-item label="场景名称：" :label-width="formLabelWidth">
              <el-input v-model="updateSceneForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属公司：" :label-width="formLabelWidth">
              <el-input v-model="updateSceneForm.name"></el-input>
            </el-form-item>
            <el-form-item label="场景图：" :label-width="formLabelWidth">
              <el-upload action="//jsonplaceholder.typicode.com/posts/" type="drag" :thumbnail-mode="true">
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
        <el-button type="primary" @click="updateSceneFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="3">监测点列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="addSpotFormVisible = true">新 增
        </el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
         <el-table :data="spotTableData" stripe border>
        <el-table-column prop="addindex" label="监测点位" width="180" align="center"></el-table-column>
        <el-table-column prop="addname" label="监测点名称" width="360" align="center"></el-table-column>
        <el-table-column prop="addstatus" label="场景" width="240" align="center"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" align="center">
          <div>
            <el-button size="small" type="primary" @click="spotEdit()">修改</el-button>
            <el-button size="small" type="danger" @click="">删除</el-button>
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
              <el-input v-model="addSpotForm.name"></el-input>
            </el-form-item>
            <el-form-item label="监测点位：" :label-width="formLabelWidth">
              <el-input v-model="addSpotForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属场景：" :label-width="formLabelWidth">
              <el-input v-model="addSpotForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSpotFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSpotFormVisible = false">确 定</el-button>
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
    <!-- <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="18">
        <el-steps :active="0" finish-status="success">
          <el-step title="上传场景图" icon="upload2"></el-step>
          <el-step title="新增监测点" icon="edit"></el-step>
          <el-step title="提交" icon="upload"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="6">
        <el-upload action="//jsonplaceholder.typicode.com/posts/" type="drag" :thumbnail-mode="true" 
          :on-preview="handlePreview" :on-remove="handleRemove">
          <i class="el-icon-upload"></i>
          <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="3">
          <el-button type="info" size="large" class="submit-button" @click="newSpotFormVisible = true">点击新增监测点</el-button>
          <el-dialog title="新监测点信息" v-model="newSpotFormVisible">
            <el-form :model="newSpotForm" label-position="left">
              <el-form-item label="监测点位：" :label-width="formLabelWidth">
                <el-input v-model="newSpotForm.index" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="监测点名称：" :label-width="formLabelWidth">
                <el-input v-model="newSpotForm.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newSpotFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="newSpotFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
        <el-col :span="5">&nbsp;</el-col>
        <el-col :span="3">
          <el-button type="primary" size="large" class="submit-button">提 交</el-button>
        </el-col>
    </el-row>
    <br><br>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="6">监测点列表</el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="19">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="addindex" label="监测点位" width="180" align="center"></el-table-column>
        <el-table-column prop="addname" label="监测点名称" width="360" align="center"></el-table-column>
        <el-table-column prop="addstatus" label="场景图" width="180" align="center"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" align="center">
          <div>
            <el-button size="small" type="primary" @click="handleEdit($index, row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
    </el-row> -->
  </div>  
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      addSceneFormVisible: false,
      updateSceneFormVisible: false,
      addSpotFormVisible: false,
      updateSpotFormVisible: false,
      addSceneForm: {
        name: ''
      },
      updateSceneForm: {
        name: ''
      },
      addSpotForm: {
        index: '',
        name: ''
      },
      updateSpotForm: {
        index: '',
        name: ''
      },
      formLabelWidth: '120px',
      formAlignRight: {
        index: '',
        name: ''
      },
      sceneTableData: [
        {
          name: '场景一',
          image: '图一'
        },
        {
          name: '场景二',
          image: '图二'
        }
      ],
      spotTableData: [
        {
          addindex: '1',
          addname: '309房间门口',
          addstatus: '场景一'
        },
        {
          addindex: '2',
          addname: '309房间会议室内',
          addstatus: '场景二'
        }
      ]
    }
  },
  methods: {
    sceneEdit () {
      this.updateSceneFormVisible = true
    },
    spotEdit () {
      this.updateSpotFormVisible = true
    }
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