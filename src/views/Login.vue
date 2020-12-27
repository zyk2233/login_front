<template>
    <el-container style="height:100%">
        <el-main>
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item label="密码：" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" round v-on:click='login'>登录</el-button>
                    <el-button type="primary" round v-on:click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<style lang="scss">
    .el-main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 1, max: 10, message: '长度在10个字符以内', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    computed: {
        recorded_username: function(){
            return this.$store.state.recorded_username;
        }
    },
    methods: {
        login: function(){
            let postData = this.$qs.stringify(this.form);
            let that = this;
            this.$axios.post('http://localhost/Login_war_exploded/account/login',postData).then(Response=>{
                //Response.data即为获取的Msg对象
                that.$store.commit('change_user',Response.data.extend.account.username);
                that.$router.push({name: 'Home'})
            },()=>{
                that.$router.push({name: 'Error'})
            })
        },
        register: function(){
            this.$router.push({name: 'Register'});
        }
    }
}
</script>