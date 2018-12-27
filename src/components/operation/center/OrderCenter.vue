<template>
	<div style="margin: 0 auto">
		<div style="text-align:center; margin-top: 20px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                           :disabled="isDisAble" style="width: 200px">全部订单
             		</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox-group v-model="checkedIterms" @change="handleCheckedItermsChange" :disabled="isDisAble">
	                	<el-checkbox v-for="iterm in iterms" :label="iterm" :key="iterm">{{iterm}}</el-checkbox>
	              	</el-checkbox-group>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin: 20px; min-height: 350px;">
			<el-table :data="orderData" v-loading="isDisAble">
				<el-table-column prop="date" label="日期" width="100"></el-table-column>
				<el-table-column prop="labName" label="名称" width="180"></el-table-column>
				<!-- <el-table-column prop="labAddress" label="地址" width="240"></el-table-column> -->
				<el-table-column prop="userName" label="预约人" width="80"></el-table-column>
				<el-table-column prop="time" label="预约日期" width="320"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看</el-button>
					<el-button type="text" size="small" @click="beSpeak(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10]"
				:page-size="5"
				layout="total, prev, pager, next, jumper"
				:total="orderTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过', '已驳回', '已完成']
export default {
	name: 'OrderCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
	        currentPage: 1,
	        queryData: {
	        	userId: '',
	        	status: [],
	        	page: 1
	        },
			orderData: [
				{
					date: '2018-12-13',
					labName: "光化学折线实验室",
					labAddress: "杭州电子科技大学1教北534",
					userName: "赵伟华",
	        		time: '2018-12-15 08:30-2018-12-15 10:30',
	        		status: '待审核'
				}			
			],
			allOrderNum: 1,
			checkAll: false,
			isIndeterminate: true,
			checkedIterms: ['待审核'],
        	iterms: itermOptions,
		}
	},
	created(){
		this.getSession()
		this.queryOrder()
	},
	computed: {
      orderTotal() {
      	return this.allOrderNum
      }
    },
	methods: {
		getSession() {
			this.queryData.userId = sessionStorage.getItem('userId')
			if (sessionStorage.getItem('queryOrderPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('queryOrderPage'))
				this.currentPage = parseInt(sessionStorage.getItem('queryOrderPage'))
			} else {
				this.queryData.page = 1
				this.currentPage = 1
			}
			if (sessionStorage.getItem('checkedIterms') != null){
				this.checkedIterms = sessionStorage.getItem('checkedIterms').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allOrderNum') != null) {
				this.allOrderNum = parseInt(sessionStorage.getItem('allOrderNum'))
			} else {
				this.queryOrderNum()
			}
		},
		setSession() {
			sessionStorage.setItem('queryOrderPage', this.queryData.page)
		},
		query() {
			this.queryData.status = this.checkedIterms
			sessionStorage.setItem('checkedIterms', this.checkedIterms)
			this.currentPage = '1'
			if (this.checkedIterms.length == 0) {
				this.orderData = []
				return
			}
			this.queryOrderNum()
			this.queryOrder()
		},
		queryOrderNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.AdminShowOrderNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPage = 1
					this.allOrderNum = result.r
					sessionStorage.setItem('allOrderNum' , this.allOrderNum)
				} else {
					this.allOrderNum = 1
					this.currentPage = 1
					this.$message.error(result.r)
				}
			}, (err) => {
	            this.$message.error(err.msg)
	        })
			// todo
		},
		queryOrder(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				page: this.queryData.page
			}
			this.setSession()
			this.isDisAble = true
			this.$http.AdminShowOrder(submitData).then((result) => {
				if (result.c == 200) {
					this.orderData = result.r
				} else {
					this.orderData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		showDetails(index, row){
			sessionStorage.setItem('orderId', row.orderId)
			sessionStorage.setItem('date', row.date)
			sessionStorage.setItem('labId', row.labId)
			sessionStorage.setItem('labName', row.labName)
			sessionStorage.setItem('labAddress', row.labAddress)
			sessionStorage.setItem('adminName', row.adminName)
			sessionStorage.setItem('orderUserName', row.userName)
			sessionStorage.setItem('orderUserId', row.userId)
			sessionStorage.setItem('usedTo', row.usedTo)
			sessionStorage.setItem('time', row.time)
			sessionStorage.setItem('remarks', row.remarks)
			sessionStorage.setItem('adminRemarks', row.adminRemarks)
			sessionStorage.setItem("orderStatus", row.status)
			this.$router.push({name: 'OrderShow', params: {orderId: row.id}})
		},
		beSpeak(index, row){
			sessionStorage.setItem('orderId', row.orderId)
			sessionStorage.setItem('labId', row.labId)
			sessionStorage.setItem('labName', row.labName)
			sessionStorage.setItem('address', row.labAddress)
			sessionStorage.setItem('adminName', row.adminName)
			sessionStorage.setItem('orderUserId', row.userId)
			sessionStorage.setItem('usedTo', row.usedTo)
			sessionStorage.setItem('time', row.time)
			sessionStorage.setItem('remarks', row.remarks)
			sessionStorage.setItem('adminId', row.adminId)
			sessionStorage.setItem('orderUserName', row.userName)
			sessionStorage.setItem('adminRemarks', row.adminRemarks)
			this.$router.push({name: 'OrderEdit', params: {orderId: row.id}})
		},
		handleSizeChange(val) {
		},
		handleCurrentChange(val) {
			this.queryData.page = val
			this.queryOrder()
		},
		handleCheckAllChange(val) {
			this.checkedIterms = val ? itermOptions : []
			this.isIndeterminate = false
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedIterms', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedIterms').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedIterms', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedIterms').split(',')
			this.query()
		},
	},
	components: {
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>