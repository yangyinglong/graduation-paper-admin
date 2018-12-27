<template>
	<div class="labcenter-main">
		<el-tabs type="border-card" style="min-height: 530px; min-width: 11
		00px" :value="tagPage">
			<!-- <el-tab-pane label="实验室管理" name="labadmincenter" v-if="this.$store.state.loginStatus === 2">增加实验室</el-tab-pane>
			<el-tab-pane label="订单管理" name="orderadmincenter" v-if="this.$store.state.loginStatus === 2">点单处理</el-tab-pane> -->
			<el-tab-pane label="预约单处理" name="ordercenter"><OrderCenter /></el-tab-pane>
			<el-tab-pane label="实验室管理" name="labcenter"><LabCenter /></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import LabCenter from '@/components/operation/center/LabCenter'
import OrderCenter from '@/components/operation/center/OrderCenter'
export default {
	name: 'Center',
	data () {
		return {
			tagPage: 'ordercenter'
		}
	},
	created(){
		if (this.$route.params.tagP) {
			this.tagPage = this.$route.params.tagP
		}
	},
	methods: {
	},
	components: {
		LabCenter,
		OrderCenter
	},
}		
</script>

<style scoped>
	.labcenter-main{
		width: 70%;
		min-width: 1100px;
		margin: 0 auto;
	}
</style>