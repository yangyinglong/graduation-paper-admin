<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="orderShow" class="demo-form-inline" label-width="70px" style="margin-top: 20px;">
				<el-form-item label="名称">
					<el-input v-model="orderShow.labName" placeholder="实验室" style="width: 300px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="账号">
					<el-input v-model="orderShow.labBeSpeakId" placeholder="杭电" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="orderShow" class="demo-form-inline" label-width="70px">
				<el-form-item label="地址">
					<el-input v-model="orderShow.labAddress" placeholder="杭州电子科技大学1教南楼534" style="width: 300px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="orderShow.labBeSpeakName" placeholder="预约人姓名" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="70px" :model="orderShow">
				<el-form-item label="时间">
					<div class="block">
						<el-date-picker
						v-model="orderShow.time"
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
					<el-input v-model="orderShow.usedTo" placeholder="杭州电子科技大学1教南楼534" style="width: 590px; margin-left: -10px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="orderShow.remarks" placeholder="备注信息" style="width: 590px; margin-left: -10px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="反馈">
					<el-input type="textarea" v-model="orderShow.adminRemarks" placeholder="反馈通知" style="width: 590px; margin-left: -10px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="deleteOrder" type="info" v-if="orderShow.status !== '已完成'">取消预约</el-button>
					<el-button style="width: 100px" @click="cencel">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>

export default {
	name: 'OrderCenter',
	data() {
		return {
			orderShow: {
				orderId: '',
				labId: '',
				labName: '光电化学实验室',
				labAddress: '杭州电子科技大学1教南楼534',
				labAdmin: '赵伟华',
				labBeSpeakName: '刘海明',
				labBeSpeakId: '',
				time: ['2018-12-12 08:00:00', '2018-12-14 12:00:00'],
				usedTo: '教学实践',
				remarks: '开发测试！',
				adminRemarks: '',
				status: '',
			},
		}
	},
	created() {
		this.orderShow.orderId = sessionStorage.getItem('orderId')
		this.orderShow.labName = sessionStorage.getItem('labName')
		this.orderShow.labAddress = sessionStorage.getItem('labAddress')
		this.orderShow.labAdmin = sessionStorage.getItem('adminName')
		this.orderShow.labBeSpeakName = sessionStorage.getItem('orderUserName')
		this.orderShow.labBeSpeakId = sessionStorage.getItem('orderUserId')
		this.orderShow.time = sessionStorage.getItem('time').split(' - ')
		this.orderShow.usedTo = sessionStorage.getItem('usedTo')
		this.orderShow.remarks = sessionStorage.getItem('remarks') == 'null' ? '' : sessionStorage.getItem('remarks')
		this.orderShow.adminRemarks = sessionStorage.getItem('adminRemarks') == 'null' ? '' : sessionStorage.getItem('adminRemarks')
		this.orderShow.status = sessionStorage.getItem("orderStatus")
		console.log(this.orderShow)
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'ordercenter'}})
		},
		deleteOrder() {
			this.$http.CancelOrder(this.orderShow.orderId).then((result) => {
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
	}
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