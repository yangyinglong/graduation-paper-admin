<template>
	<div class="usercenter-main">
		<div class="content">
			<el-form label-position='left' :model="changeUserInfo" status-icon :rules="rules" ref="changeUserInfo" label-width="100px" class="demo-ruleForm">
				<br><br>
				<el-form-item label="学号：" prop="studentId">
	            	<el-input v-model="changeUserInfo.studentId" placeholder="用户登录" :readonly="true"></el-input>
	            </el-form-item>
	            <el-form-item label="姓名：" prop="name">
	            	<el-input v-model="changeUserInfo.name" placeholder="请输入姓名" ></el-input>
	            </el-form-item>
	            <el-form-item label="手机号码：" prop="phone">
	            	<el-input v-model="changeUserInfo.phone" placeholder="用户登录和找回密码"></el-input>
	            </el-form-item>
	             <el-form-item label="邮箱：" prop="eMail">
	            	<el-input v-model="changeUserInfo.eMail" placeholder="消息通知"></el-input>
	            </el-form-item>
				<el-form-item label="密码：" prop="password">
					<el-input type="password" v-model="changeUserInfo.password" autocomplete="off" placeholder="如不修改密码，则不要输入"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="checkPass">
					<el-input type="password" v-model="changeUserInfo.checkPass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="width:310px; float: right; background-color: #d7d7d7;" @click="submit('changeUserInfo')">
					提交修改
					</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
	
</template>

<script>
export default{
	name: 'UserCenter',
	data(){
		var validatePass = (rule, value, callback) => {
			if (value === '' && this.changeUserInfo.checkPass === '') {
				callback();
			} else {
				if (this.changeUserInfo.checkPass !== '') {
					this.$refs.changeUserInfo.validateField('checkPass');
				}
			callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '' && this.changeUserInfo.password === '') {
				callback();
			} else if (value !== this.changeUserInfo.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			changeUserInfo: {
				studentId: '',
				name: '',
				phone: '',
				eMail: '',
				password: '',
				checkPass: ''
			},
			rules: {
				studentId:[
					{required: true, message: '学号不能为空', trigger: 'blur'},
		            {min: 8, max: 8, message: '学号长度为8位数字值', trigger: 'blur'}
				],
				name:[
					{required: true, message: '姓名不能为空', trigger: 'blur'}
				],
				phone: [
		            {required: true, message: '手机号码不能为空', trigger: 'blur'},
		            {min: 11, max: 11, message: '手机号码长度为11位数字值', trigger: 'blur'}
	        	],
				password: [
					{required: true, validator: validatePass, trigger: 'blur'}
				],
				checkPass: [
					{required: true, validator: validatePass2, trigger: 'blur'}
				],
				eMail: [
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
      				{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
				]
			},
		}
	},
	created() {
		this.changeUserInfo.studentId = sessionStorage.getItem('userId')
		this.changeUserInfo.name = sessionStorage.getItem('userName')
		this.changeUserInfo.phone = sessionStorage.getItem('phone')
		this.changeUserInfo.eMail = sessionStorage.getItem('eMail')
	},
	methods:{
		submit(changeUserInfo){
			this.$refs[changeUserInfo].validate((valid) => {
				if (valid) {
					console.log("**********")
					var submitData = {
						id: this.changeUserInfo.studentId,
						name: this.changeUserInfo.name,
						phone: this.changeUserInfo.phone,
						eMail: this.changeUserInfo.eMail,
						password: this.changeUserInfo.password
					}
					this.$http.EditUser(submitData).then((result) => {
						if (result.c === 200) {
							this.$message({
								message: result.r,
								type: 'success'
							});
							sessionStorage.setItem('userName', this.changeUserInfo.name)
                			sessionStorage.setItem('phone', this.changeUserInfo.phone)
                			sessionStorage.setItem('eMail', this.changeUserInfo.eMail)
							this.$router.push({name: 'Home', params: {}})
						} else {
							this.$message.warning(result.r)
						}
					}, (err) => {
						this.$message.error(err.msg)
					})				

				} else {
					this.$alert('请完善信息', {
					})
				}
			});
		}
	}
}
</script>

<style scoped>
	.usercenter-main{
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
		/*border:1px solid #999999;*/
		margin-top: 50px;
	}
</style>