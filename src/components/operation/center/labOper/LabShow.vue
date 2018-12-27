<template>
	<div style="min-height: 530px; width: 720px; margin: 0 auto; text-align: center;">
		<br>
		<div style="width: 100%;">
			<el-form :inline="true" :model="labFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="名称">
			    <el-input v-model="labFrom.name" placeholder="实验室" readonly="true"></el-input>
			  </el-form-item>
			  <el-form-item label="管理员">
			    <el-input v-model="labFrom.admin" placeholder="管理员" readonly="true"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="labFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="地址">
			    <el-input v-model="labFrom.address" placeholder="地址"readonly="true"></el-input>
			  </el-form-item>
			  <el-form-item label="开放时间">
			    <el-input v-model="labFrom.openTime" placeholder="未知"readonly="true"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="labFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="描述">
			    <el-input type="textarea" v-model="labFrom.desc" placeholder="实验室是科学的摇篮，是科学研究的基地，科技发展的源泉，对科技发展起着非常重要的作用。实验室按归属可分为三类：第一类是从属于..." style="width: 524px"readonly="true"></el-input>
			  </el-form-item>
			</el-form>
		</div>
		<div style="margin: 0 auto">
			<el-row>
				<router-link to="/center"><el-button style="width: 120px" @click="toCenter">返回</el-button></router-link>
				<el-button type="info" style="width: 120px" @click="beSpeak">修改</el-button>
			</el-row>
		</div>
		<br>
		<div style="width: 460px; margin: 0 auto; margin-top: 80px">
			<div class="block" >
				<el-date-picker
				@change="change"
				v-model="time"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				:size="large"
				:default-time="['00:00:00', '23:59:59']"
				style="width: 500px">
				</el-date-picker>
			</div>
		</div>
		<br>
		<div style="width: 460px; margin: 0 auto;">
			<el-table
			:data="orderData"
			style="width: 100%">
				<el-table-column
				prop="startTime"
				label="开始时间"
				width="180">
				</el-table-column>
				<el-table-column
				prop="endTime"
				label="结束时间"
				width="180">
				</el-table-column>
				<el-table-column
				prop="bespeakName"
				label="预约人"
				width="100">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LabShow',
	data() {
		return {
			labFrom: {
				labId: '111111111',
				name: '电子线路创新实践实验室',
				address: '杭州电子科技大学8教北217',
				admin: '唐奇超',
				adminId: '',
				openTime: '全天开放',
				desc: '实验室是科学的摇篮，是科学研究的基地，科技发展的源泉，对科技发展起着非常重要的作用。实验室按归属可分为三类：第一类是从属于...'
			},
			time: '',
			orderData: [
				// {
				// 	startTime: '2018-12-12 10:30',
				// 	endTime: '2018-12-12 12:30',
				// 	bespeakName: '杨映龙'
				// }
			]
		}
	},			
	created() {
		this.labFrom.labId = sessionStorage.getItem('labId')
		this.labFrom.name = sessionStorage.getItem('labName')
		this.labFrom.address = sessionStorage.getItem('address')
		this.labFrom.admin = sessionStorage.getItem('adminName')
		this.labFrom.adminId = sessionStorage.getItem('adminId')
		if (sessionStorage.getItem('openTime') == 'null') {
			this.labFrom.openTime = ''
		} else {
			this.labFrom.openTime = sessionStorage.getItem('openTime')
		}
		if (sessionStorage.getItem('desc') == 'null') {
			this.labFrom.desc = ''
		} else {
			this.labFrom.desc = sessionStorage.getItem('desc')
		}
	},
	methods: {
		toCenter() {
			this.$router.push({name: 'Center', params:{tagP: 'labcenter'}})
		},
		change() {
			this.showLabBespeak()
		},
		beSpeak() {
			this.$router.push({name: 'LabEdit', params: {}})
		},
		showLabBespeak() {
			var showBespeakFrom = {
				'labId': this.labFrom.labId,
				'time': this.time
			}
			this.$http.ShowLabBespeak(showBespeakFrom).then((result) => {
				if (result.c == 200) {
					this.orderData = result.r
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
	computed: {
	}
}
</script>

<style scoped>
  
</style>