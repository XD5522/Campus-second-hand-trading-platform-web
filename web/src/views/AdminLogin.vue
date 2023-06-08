<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="login-form">
                <h2 class="login-title">管理员登录</h2>
                <el-form ref="loginForm" :model="form" :rules="rules" label-width="0px">
                    <el-form-item prop="adminAccount">
                        <el-input v-model="form.adminAccount" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="adminPassword">
                        <el-input type="password" v-model="form.adminPassword" placeholder="请输入密码"></el-input>
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
import {login} from "@/api/adminlogin";
import router from "@/router";
import {getToken, setAdminToken, setToken, setUserId} from "@/api/cookie";
import {getUserId} from "@/api/userlogin";

interface Form {
    adminAccount: string;
    adminPassword: string;
}

export default defineComponent({
    name: 'AdminLogin',
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
                adminAccount: '',
                adminPassword: ''
            } as Form,
            rules: {
                adminAccount: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                adminPassword: [
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
                    const md5password = md5(this.form.adminPassword);
                    //将待提交表单封装进data
                    const data = {
                        adminAccount : this.form.adminAccount,
                        adminPassword : md5password
                    }
                    console.log(data);

                    //调用admin/login登陆
                    login(data).then((res) => {
                        console.log(res);
                        if (res.code == 200) {
                            //登陆成功后需要保存token,并跳转
                            const token = res.data
                            localStorage.setItem('adminToken', token)
                            console.log(localStorage)
                            setAdminToken(token, 1)
                            console.log(getToken())
                            router.push('/AdminMain/main')
                            console.log("登陆成功");
                        } else {
                            alert("用户名或密码错误");
                        }
                    })
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
