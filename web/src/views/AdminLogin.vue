<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="login-form">
                <h2 class="login-title">用户登录</h2>
                <el-form ref="loginForm" :model="form" :rules="rules" label-width="0px">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import md5 from 'md5';
import {defineComponent, reactive} from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElCard } from 'element-plus';
import { LoginData } from '@/type/login';
import {login} from "@/api/adminlogin";
import router from "@/router";

interface Form {
    username: string;
    password: string;
}

export default defineComponent({
    name: 'Login',
    components: {
        ElForm,
        ElFormItem,
        ElInput,
        ElButton,
        ElCard
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            } as Form,
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleLogin() {
            (this.$refs.loginForm as any).validate((valid: any) => {
                if(valid){//输入框不能为空
                    //加密密码
                    const md5password = md5(this.form.password);
                    //将待提交表单封装进data
                    const data = reactive(new LoginData());
                    data.ruleForm.username=this.form.username;
                    data.ruleForm.password=md5password;
                    //调用@api/login登陆
                    console.log(data.ruleForm);
                    login(data.ruleForm).then((res)=>{
                        console.log(res);

                        //TODO 这里需要判断登陆是否成功,router的跳转功能也仍存在问题

                        //登陆成功后需要保存token,并跳转
                        localStorage.setItem("token",res.data.token)//保存token
                        router.push('/AdminMain')

                    })
                    console.log("登陆成功");
                }
                else{
                    alert("登陆失败");
                }
            });
        }
    }
});
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
    width: 360px;
}

.login-form {
    padding: 20px;
}

.login-title {
    text-align: center;
    margin-bottom: 20px;
}
</style>
