<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="labEditFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px;">
				<el-form-item label="名称">
					<el-input v-model="labEditFrom.labName" placeholder="实验室" style="width: 300px"></el-input>
				</el-form-item>
				<el-form-item label="管理员">
					<el-input v-model="labEditFrom.labAdminId" placeholder="杭电" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="labEditFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="地址">
					<el-input v-model="labEditFrom.labAddress" placeholder="杭州电子科技大学1教南楼534" style="width: 300px" ></el-input>
				</el-form-item>
				<el-form-item label="开放时间">
					<el-input v-model="labEditFrom.openTime" placeholder=""></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="70px" :model="labEditFrom">
				<el-form-item label="状态">
					<el-select v-model="labEditFrom.openStatus" placeholder="开放状态" style="width: 590px; margin-left: -10px">
						<el-option
						v-for="item in openStatuses"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" v-model="labEditFrom.desc" placeholder="描述信息" style="width: 590px; margin-left: -10px"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: -40px">
					<el-button type="primary" @click="onSubmit" style="width: 100px">修改</el-button>
					<el-button style="width: 100px" @click="cencel">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>

export default {
	name: 'LabBeSpeak',
	data() {
		return {
			labEditFrom: {
				labId: '',
				labName: '',
				labAddress: '',
				labAdminId: '',
				openTime: '',
				openStatus: '',
				desc: ''
			},
			openStatuses: [
				{
					value: '开放',
					label: '开放'
				},
				{
					value: '不开放',
					label: '不开放'
				}
			]
		}
	},
	created(){
		this.labEditFrom.labId = sessionStorage.getItem('labId')
		this.labEditFrom.labName = sessionStorage.getItem('labName')
		this.labEditFrom.labAddress = sessionStorage.getItem('address')
		this.labEditFrom.labAdminId = sessionStorage.getItem('userId')
		this.labEditFrom.openTime = sessionStorage.getItem('openTime') == 'null' ? '' : sessionStorage.getItem('openTime')
		this.labEditFrom.openStatus = sessionStorage.getItem('labStatus')
		this.labEditFrom.desc = sessionStorage.getItem('desc') == 'null' ? '' : sessionStorage.getItem('desc')
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'labcenter'}})
		},
		onSubmit() {
			if (this.labEditFrom.labName == '') {
				this.$message.error('请填写实验室名称！');
				return
			}
			if (this.labEditFrom.labAddress == '') {
				this.$message.error('请填写实验室地址！');
				return
			}
			console.log(this.labEditFrom)
			this.$http.EditLaboratory(this.labEditFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'labcenter'}})
				} else {
					this.$message({
						message: result.r,
						type: 'error'
					});
				}
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		}
	},
}
</script>

<style scoped>
	.lab-main{
		min-height: 530px;
		text-align: center;
		margin: 0 auto;
	}
	.content {
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		horiz-align: center;
		white-space: nowrap;
		margin: 0;
		border:1px solid #999999;
		margin-top: 50px;
	}
</style>