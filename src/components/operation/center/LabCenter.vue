<template>
	<div style="margin: 0 auto">
		<div style="text-align:center; margin-top: 20px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                           :disabled="isDisAble" style="width: 200px">全部实验室
             		</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox-group v-model="checkedIterms" @change="handleCheckedItermsChange" :disabled="isDisAble">
	                	<el-checkbox v-for="iterm in iterms" :label="iterm" :key="iterm">{{iterm}}</el-checkbox>
	              	</el-checkbox-group>
				</el-form-item>
				<el-form-item style="margin-left: 400px">
					<AddLab @flushQuery="flushQuery"/>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin: 20px; min-height: 350px">
			<el-table :data="labData" v-loading="isDisAble">
				<el-table-column prop="name" label="名称" width="300"></el-table-column>
				<el-table-column prop="address" label="地址" width="350"></el-table-column>
				<el-table-column prop="status" label="状态" width="80"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看</el-button>
					<el-button type="text" size="small" @click="editLab(scope.$index, scope.row)">修改</el-button>
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
				:total="total"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import AddLab from "@/components/operation/center/labOper/LabAdd"
const itermOptions = ['开放', '不开放']
export default {
	name: 'LabCenter',
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
			labData: [
				{
					name: "光化学折线实验室",
					address: "杭州电子科技大学1教北534",
					status: "不开放",
				}				
			],
			allLabNum: 1,
			checkAll: false,
			isIndeterminate: true,
			checkedIterms: ['开放'],
        	iterms: itermOptions,
		}
	},
	created(){
		this.getSession()
		this.queryLab()
	},
	computed: {
      total() {
      	return this.allLabNum
      }
    },
	methods: {
		flushQuery() {
			this.getSession()
			this.query()
		},
		getSession() {
			if (sessionStorage.getItem('queryPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('queryPage'))
				this.currentPage = parseInt(sessionStorage.getItem('queryPage'))
			} else {
				this.queryData.page = 1
				this.currentPage = 1
			}
			if (sessionStorage.getItem('openStatus') != null){
				this.checkedIterms = sessionStorage.getItem('openStatus').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allLabNum') != null) {
				this.allLabNum = parseInt(sessionStorage.getItem('allLabNum'))
			} else {
				this.queryLabNum()
			}
		},
		setSession() {
			// sessionStorage.setItem("")
			sessionStorage.setItem('queryPage', this.queryData.page)
		},
		query() {
			this.currentPage = '1'
			this.queryData.status = this.checkedIterms
			this.queryData.page = 1
			this.queryLabNum()
			this.queryLab()
		},
		queryLabNum() {
			this.queryData.page = 1
			var submitData ={
				adminId: sessionStorage.getItem("userId"),
				status: this.queryData.status,
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.AdminShowLabNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPage = 1
					this.allLabNum = result.r
					sessionStorage.setItem('allLabNum' , this.allLabNum)
				} else {
					this.allLabNum = 1
					this.currentPage = 1
					this.$message.error(result.r)
				}
			}, (err) => {
	            this.$message.error(err.msg)
	        })
			// todo
		},
		queryLab(){
			var submitData ={
				adminId: sessionStorage.getItem("userId"),
				status: this.queryData.status,
				page: this.queryData.page
			}	
			this.setSession()
			this.isDisAble = true
			this.$http.AdminShowLaboratory(submitData).then((result) => {
				if (result.c == 200) {
					this.labData = result.r
				} else {
					this.labData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		showDetails(index, row){
			sessionStorage.setItem('labId', row.id)
			sessionStorage.setItem('labName', row.name)
			sessionStorage.setItem('address', row.address)
			sessionStorage.setItem('adminName', row.adminName)
			sessionStorage.setItem('openTime', row.openTime)
			sessionStorage.setItem('labStatus', row.status)
			sessionStorage.setItem('desc', row.desc)
			sessionStorage.setItem('adminId', row.adminId)
			this.$router.push({name: 'LabShow', params: {orderId: row.id}})
		},
		editLab(index, row){
			sessionStorage.setItem('labId', row.id)
			sessionStorage.setItem('labName', row.name)
			sessionStorage.setItem('address', row.address)
			sessionStorage.setItem('adminName', row.adminName)
			sessionStorage.setItem('openTime', row.openTime)
			sessionStorage.setItem('labStatus', row.status)
			sessionStorage.setItem('desc', row.desc)
			sessionStorage.setItem('adminId', row.adminId)
			this.$router.push({name: 'LabEdit', params: {orderId: row.id}})
		},
		handleSizeChange(val) {
		},
		handleCurrentChange(val) {
			this.queryData.page = val
			this.queryLab()
		},
		handleCheckAllChange(val) {
			this.checkedIterms = val ? itermOptions : []
			this.isIndeterminate = false
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('openStatus', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('openStatus').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('openStatus', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('openStatus').split(',')
			this.query()
		}
	},
	components: {
		AddLab
	},
}		
</script>

<style scoped>
	.labcenter-main{
		width: 70%;
		margin: 0 auto;
	}
</style>