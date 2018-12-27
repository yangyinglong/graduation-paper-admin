<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="labBeSpeakFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px;">
				<el-form-item label="名称">
					<el-input v-model="labBeSpeakFrom.labName" placeholder="实验室" style="width: 300px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="账号">
					<el-input v-model="labBeSpeakFrom.labBeSpeakId" placeholder="" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="labBeSpeakFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="地址">
					<el-input v-model="labBeSpeakFrom.labAddress" placeholder="杭州电子科技大学1教南楼534" style="width: 300px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="labBeSpeakFrom.labBeSpeakName" placeholder="预约人姓名" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="70px" :model="labBeSpeakFrom">
				<el-form-item label="时间">
					<div class="block">
						<el-date-picker
						v-model="labBeSpeakFrom.time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						style="width: 590px; margin-left: -10px"
						readonly="true">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="用途">
					<el-select v-model="labBeSpeakFrom.usedTo" placeholder="用途" style="width: 590px; margin-left: -10px" disabled>
						<el-option
						v-for="item in usedTos"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="labBeSpeakFrom.remarks" placeholder="备注信息" style="width: 590px; margin-left: -10px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="审核">
					<el-select v-model="labBeSpeakFrom.review" placeholder="通过" style="width: 590px; margin-left: -10px">
						<el-option
						v-for="item in reviews"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="反馈">
					<el-input type="textarea" v-model="labBeSpeakFrom.adminRemarks" placeholder="反馈信息" style="width: 590px; margin-left: -10px"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: -40px">
					<el-button type="primary" @click="onSubmit" style="width: 100px">提交</el-button>
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
			labBeSpeakFrom: {
				orderId: '',
				labId: '',
				labName: '光电化学实验室',
				labAddress: '杭州电子科技大学1教南楼534',
				labAdmin: '赵伟华',
				labAdminId: '',
				labBeSpeakName: '刘海明',
				labBeSpeakId: '',
				time: '',
				usedTo: '',
				remarks: '',
				adminRemarks: '',
				review: '通过'
			},
			usedTos: [
				{
					value: '教师上课',
					label: '教师上课'
				},
				{
					value: '学生实践',
					label: '学生实践'
				},
				{
					value: '研究实验',
					label: '研究实验'
				},
				{
					value: '其他',
					label: '其他'
				},
			],
			reviews: [
				{
					value: '通过',
					label: '通过'
				},
				{
					value: '驳回',
					label: '驳回'
				}
			]
		}
	},
	created(){
		this.labBeSpeakFrom.orderId = sessionStorage.getItem('orderId')
		this.labBeSpeakFrom.labId = sessionStorage.getItem('labId')
		this.labBeSpeakFrom.labName = sessionStorage.getItem('labName')
		this.labBeSpeakFrom.labAddress = sessionStorage.getItem('address')
		this.labBeSpeakFrom.labBeSpeakName = sessionStorage.getItem('orderUserName')
		this.labBeSpeakFrom.labBeSpeakId = sessionStorage.getItem('orderUserId')
		this.labBeSpeakFrom.time = sessionStorage.getItem('time').split(' - ')
		this.labBeSpeakFrom.usedTo = sessionStorage.getItem('usedTo')
		this.labBeSpeakFrom.remarks = sessionStorage.getItem('remarks') == 'null' ? '' : sessionStorage.getItem('remarks')
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'ordercenter'}})
		},
		onSubmit() {
			var editFrom = {
				'orderId': this.labBeSpeakFrom.orderId,
				'review': this.labBeSpeakFrom.review,
				'adminRemarks': this.labBeSpeakFrom.adminRemarks
			}
			this.$http.AdminReviewOrder(editFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'ordercenter'}})
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