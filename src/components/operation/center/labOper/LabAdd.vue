<template>
  <div>
    <b class="linked" @click="dialogLoginVisible = true">
      <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
    </b>
    <el-dialog width="720px" title="添加实验室" :visible.sync="dialogLoginVisible">
      <div style="width: 100%;">
      <el-form :inline="true" :model="labFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="labFrom.name" placeholder="实验室名称" ></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input v-model="labFrom.adminId" placeholder="管理员" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="labFrom" :rules="rules" ref="labFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="地址" prop="address">
          <el-input v-model="labFrom.address" placeholder="实验室地址"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-input v-model="labFrom.openTime" placeholder="开放时间"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="labFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="描述">
          <el-input type="textarea" v-model="labFrom.desc" placeholder="实验室是科学的摇篮，是科学研究的基地，科技发展的源泉，对科技发展起着非常重要的作用。实验室按归属可分为三类：第一类是从属于..." style="width: 524px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <br><br>
    <div style="margin: 0 auto">
      <el-row>
        <el-button style="width: 120px" @click="dialogLoginVisible = false">取消</el-button>
        <el-button type="info" style="width: 120px" @click="addLaboratory('labFrom')">增加</el-button>
      </el-row>
    </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        dialogLoginVisible: false,
        labFrom: {
          name: '',
          address: '',
          adminId: sessionStorage.getItem('userId'),
          openTime: '',
          desc: ''
        },
        loading: false,
        rules: {
          name: [
            {required: true, message: '实验室名称不能为空', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '实验室地址不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      addLaboratory(labFrom) {
        this.$refs[labFrom].validate((valid) => {
          if (valid) {
            if (this.labFrom.name == '') {
              console.log("增加实验室失败！")
              return
            }
            this.$http.AddLaboratory(this.labFrom).then((result) => {
              if (result.c === 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.labFrom.name = ''
                this.labFrom.address = ''
                this.labFrom.openTime = ''
                this.labFrom.desc = ''
                this.$emit('flushQuery')
                this.dialogLoginVisible = false
              } else {
                this.$message.warning(result.r)
              }
            }, (err) => {
              this.$message.error(err.msg)
            })
          } else {
            this.$message.warning("请完善信息！")
          }
        })
      }
    }
  }

</script>

<style scoped>
.content {
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	horiz-align: center;
	white-space: nowrap;
	margin: 0;
}
</style>