<template>
    <div class="login-container">
        <el-card class="login-card">
            <div class="login-form">
                <h2 class="login-title">用户登录</h2>
                <el-form ref="loginForm" :model="form" :rules="rules" label-width="0px">
                    <el-form-item prop="userName">
                        <el-input v-model="form.userName" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="userPassword">
                        <el-input type="password" v-model="form.userPassword" placeholder="请输入密码"></el-input>
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
import {getUserId, login} from "@/api/userlogin";
import router from "@/router";
import {getToken, setToken, setUserId} from "@/api/cookie";

interface Form {
    userName: string;
    userPassword: string;
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
                userName: '',
                userPassword: ''
            } as Form,
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                userPassword: [
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
                    const md5password = md5(this.form.userPassword);
                    //将待提交表单封装进data
                    const data = {
                        userName : this.form.userName,
                        userPassword : md5password
                    }
                    console.log(data);

                    //调用@api/login登陆
                    login(data).then(async (res) => {
                        console.log(res)
                        if (res.code == 200) {
                            //登陆成功后需要保存token,并跳转
                            const token = res.data
                            localStorage.setItem('token', token)
                            console.log(localStorage)
                            setToken(token, 1)
                            console.log(getToken())
                            const tokenData = {
                                token : token
                            }
                            const userId = await getUserId(tokenData)
                            setUserId(userId.data, 1)
                            await router.push('/')
                        } else {
                            alert("用户名或密码错误");
                        }

                    })
                }
                else{
                  alert("请输入用户名和密码");
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
