<template>
    <el-container>
        <el-main>
            <el-form :model="form" :rules="rules" ref="register_form" label-width="100px">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="密码：" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item label="确认密码：" prop="check_password">
                    <el-input v-model="form.check_password" placeholder="请再次输入密码"></el-input>
                </el-form-item>

                <el-form-item label="手机号码：" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" round v-on:click="register">注册</el-button>
                    <el-button type="primary" round v-on:click='reset'>重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                check_password: '',
                phone: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 1, max: 10, message: '长度在10个字符以内', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 5, max: 20, message: '长度在5~20个字符之间', trigger: 'blur'}
                ],
                check_password: [
                    {required: true, validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.form.password) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur' }
                ],
                phone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    {pattern: '^1[0-9]{10}$', message: '请检查手机号格式'}
                ]
            }
        }
    },
    methods: {
        reset: function(){
            this.$refs.register_form.resetFields();
        },
        register: function(){
            let postData = this.$qs.stringify({
                username: this.form.username,
                password: this.form.password,
                phone: this.form.phone
            });
            let that = this;
            this.$axios.post('http://localhost/Login_war_exploded/account/register',postData).then(Response=>{
                if(Response.data.code==100){    //成功
                    alert('成功');
                    that.$router.push({name: 'Login'});
                }
                else{
                    alert('注册失败，请稍后重试');
                    that.$refs.register_form.resetFields();
                }
            },()=>{
                alert('注册失败，请稍后再试');
                that.$refs.register_form.resetFields();
            })
        }
    }
}
</script>