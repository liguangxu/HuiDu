<template>
  <div class="content">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="3">通道列表</el-col>
      <el-col :span="2">
        <el-button size="large" type="primary" @click="addChannelFormVisible = true">新 增
        </el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="devtype" label="设备类型" width="100" align="center"></el-table-column>
        <el-table-column prop="devnumber" label="设备编号" width="100" align="center"></el-table-column>
        <el-table-column prop="devindex" label="通道编号" width="100" align="center"></el-table-column>
        <el-table-column prop="devfactor" label="监测因子" width="100" align="center"></el-table-column>
        <el-table-column prop="devfactorunit" label="监测因子单位" width="100" align="center"></el-table-column>
        <el-table-column prop="devfactoricon" label="监测因子图标" width="100" align="center"></el-table-column>
        <el-table-column prop="usermaxvalue" label="用户定义最大值" width="100" align="center"></el-table-column>
        <el-table-column prop="userminvalue" label="用户定义最小值" width="100" align="center"></el-table-column>
        <el-table-column prop="devsence" label="所属场景" width="100" align="center"></el-table-column>
        <el-table-column prop="devmonitorpoint" label="所属监控点" width="120" align="center"></el-table-column>
        <el-table-column prop="devonline" label="是否挂载" align="center"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" width="160" fixed="right" align="center">
          <div>
            <el-button size="small" type="primary" @click="channelEdit(row)">修改</el-button>
            <el-button size="small" type="danger" @click="">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>

    <el-dialog title="新增通道" v-model="addChannelFormVisible">
      <el-form :model="addChannelForm">
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入通道编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入监测因子"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="addChannelForm.name" filterable placeholder="请选择所属场景">
            <el-option
              v-for="item1 in options1"
              :label="item1.label"
              :value="item1.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="10">
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入监测因子单位">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入监测因子图标">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入自定义最大值">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addChannelForm.name" placeholder="请输入自定义最小值">
          </el-input>
        </el-form-item>
         <el-form-item>
          <el-select v-model="addChannelForm.name" filterable placeholder="请选择所属监测点">
            <el-option
              v-for="item2 in options2"
              :label="item2.label"
              :value="item2.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addChannelFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addChannelFormVisible = false">确定并挂载</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改通道" v-model="updateChannelFormVisible">
      <el-form :model="updateChannelForm">
      <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入通道编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入监测因子"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="updateChannelForm.name" filterable placeholder="请选择所属场景">
            <el-option
              v-for="item1 in options1"
              :label="item1.label"
              :value="item1.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="10">
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入监测因子单位">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入监测因子图标">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入自定义最大值">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="updateChannelForm.name" placeholder="请输入自定义最小值">
          </el-input>
        </el-form-item>
         <el-form-item>
          <el-select v-model="updateChannelForm.name" filterable placeholder="请选择所属监测点">
            <el-option
              v-for="item2 in options2"
              :label="item2.label"
              :value="item2.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateChannelFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateChannelFormVisible = false">确定并挂载</el-button>
      </div>
    </el-dialog>

    <!-- <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="3">
      <el-steps :space="250" :active="0" direction="vertical" finish-status="success">
          <el-step title="新增通道" icon="edit"></el-step>
          <el-step title="挂载通道" icon="upload"></el-step>
        </el-steps>
      </el-col>
      <el-form :model="newChannelForm" label-position="left" label-width="130px">
      <el-col :span="5">
        <el-form-item label="设备类型：">
          <el-input v-model="newChannelForm.devtype"></el-input>
        </el-form-item>
        <el-form-item label="设备编号：">
          <el-input v-model="newChannelForm.devnumber"></el-input>
        </el-form-item>
        <el-form-item label="通道编号：">
          <el-input v-model="newChannelForm.devindex"></el-input>
        </el-form-item>
        <el-form-item label="监测因子：">
          <el-input v-model="newChannelForm.devfactor"></el-input>
        </el-form-item>
        <br>
        <el-button type="primary" size="large" class="submit-button">挂 载</el-button>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="5">
        <el-form-item label="监测因子单位：">
          <el-input v-model="newChannelForm.devfactorunit"></el-input>
        </el-form-item>
        <el-form-item label="监测因子图标：">
          <el-input v-model="newChannelForm.devfactoricon"></el-input>
        </el-form-item>
        <el-form-item label="设备端最大值：">
          <el-input v-model="newChannelForm.devmaxvalue" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备端最小值：">
          <el-input v-model="newChannelForm.devminvalue" :disabled="true"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6">
        <el-form-item label="用户定义最大值：">
          <el-input v-model="newChannelForm.usermaxvalue"></el-input>
        </el-form-item>
        <el-form-item label="用户定义最小值：">
          <el-input v-model="newChannelForm.userminvalue"></el-input>
        </el-form-item>
        <el-form-item label="所属场景">
          <el-select v-model="devscene" filterable placeholder="请选择">
            <el-option
              v-for="item1 in options1"
              :label="item1.label"
              :value="item1.value">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="所属监控点">
          <el-select v-model="devmonitorpoint" filterable placeholder="请选择">
            <el-option
              v-for="item2 in options2"
              :label="item2.label"
              :value="item2.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-form>
    </el-row>

  <br><br>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="6">通道列表</el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="devtype" label="设备类型" width="100" align="center"></el-table-column>
        <el-table-column prop="devnumber" label="设备编号" width="100" align="center"></el-table-column>
        <el-table-column prop="devindex" label="通道编号" width="100" align="center"></el-table-column>
        <el-table-column prop="devfactor" label="监测因子" width="100" align="center"></el-table-column>
        <el-table-column prop="devfactorunit" label="监测因子单位" width="100" align="center"></el-table-column>
        <el-table-column prop="devfactoricon" label="监测因子图标" width="100" align="center"></el-table-column>
        <el-table-column prop="devminvalue" label="设备端最大值" width="80" align="center"></el-table-column>
        <el-table-column prop="devminvalue" label="设备端最小值" width="80" align="center"></el-table-column>
        <el-table-column prop="usermaxvalue" label="用户定义最大值" width="100" align="center"></el-table-column>
        <el-table-column prop="userminvalue" label="用户定义最小值" width="100" align="center"></el-table-column>
        <el-table-column prop="devsence" label="所属场景" width="100" align="center"></el-table-column>
        <el-table-column prop="devmonitorpoint" label="所属监控点" width="120" align="center"></el-table-column>
        <el-table-column prop="devonline" label="是否挂载" align="center"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" width="160" fixed="right" align="center">
          <div>
            <el-button size="small" type="primary" @click="handleEdit($index, row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
    </el-row>  -->
  </div>  
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      addChannelFormVisible: false,
      updateChannelFormVisible: false,
      newSpotFormVisible: false,
      newSpotForm: {
        index: '',
        name: ''
      },
      formLabelWidth: '120px',
      addChannelForm: {
        index: '',
        name: ''
      },
      updateChannelForm: {
        index: '',
        name: ''
      },
      tableData: [
        {
          index: '1',
          devtype: '666C',
          devnumber: '1608001',
          devindex: '01',
          devfactor: '温度',
          devfactorunit: '°C',
          devfactoricon: '无',
          devmaxvalue: '-',
          devminvalue: '-',
          usermaxvalue: '50',
          userminvalue: '-50',
          devsence: '场景1',
          devmonitorpoint: '监控点1',
          devonline: '已挂载'
        },
        {
          index: '2',
          devtype: '666C',
          devnumber: '1608001',
          devindex: '01',
          devfactor: '湿度',
          devfactorunit: '°C',
          devfactoricon: '无',
          devmaxvalue: '-',
          devminvalue: '-',
          usermaxvalue: '50',
          userminvalue: '-50',
          devsence: '场景2',
          devmonitorpoint: '监控点1',
          devonline: '已挂载'
        },
        {
          index: '3',
          devtype: '666C',
          devnumber: '1608001',
          devindex: '01',
          devfactor: '湿度',
          devfactorunit: '°C',
          devfactoricon: '无',
          devmaxvalue: '-',
          devminvalue: '-',
          usermaxvalue: '50',
          userminvalue: '-50',
          devsence: '场景2',
          devmonitorpoint: '监控点1',
          devonline: '已挂载'
        }
      ]
    }
  },
  methods: {
    channelEdit (row) {
      this.updateChannelFormVisible = true
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
  /*background-color: #20A0FF;*/
}
.submit-button {
  width: 100%;
}
</style>