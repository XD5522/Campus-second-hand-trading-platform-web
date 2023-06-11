<template>
    <div class="register-container">
        <el-card class="register-card" shadow="always">
            <div class="register-form">
                <h2>商家注册</h2>
                <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-width="120px">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="registerForm.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="城市" prop="city">
                        <el-input v-model="registerForm.city" placeholder="请输入城市"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="registerForm.gender" placeholder="请选择性别">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="银行卡号" prop="bankCard">
                        <el-input v-model="registerForm.bankCard" placeholder="请输入银行卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="registerForm.email" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="上传营业执照" prop="license">
                        <el-upload
                            class="upload-demo"
                            action="http://localhost:8080/user/uploadLicense"
                            :on-success="handleSuccess"
                            :before-upload="beforeUpload"
                            ref="uploadRef"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkpassword">
                        <el-input type="password" v-model="registerForm.checkpassword" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input v-model="registerForm.code" placeholder="请输入验证码" style="width: 284px"></el-input>
                        <IdentifyCode :identify-code="identifyCode" @click="refreshCode" style="margin: 0px 20px"></IdentifyCode>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register(registerFormRef)" style="width: 30%">注册</el-button>
                        <el-button @click="resetForm(registerFormRef)" style="width: 30%">重置</el-button>
                        <el-button type="text" @click="runUserRegister" style="width: 30%">用户注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import {defineComponent, onMounted, reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules, UploadInstance} from "element-plus";
import {RegisterData} from "@/views/Merchant_Register/type/RegisterData";
import md5 from "md5";
import {userRegister} from "@/api/UserRegister";
import router from "@/router";
import IdentifyCode from "@/views/User_Register/components/IdentifyCode.vue";
import {getToken} from "@/api/cookie";

defineComponent({
    name: "Merchant_Register"
});

const registerForm = ref<RegisterData>({
    userName: '',
    name: '',
    city: '',
    phone: '',
    gender: '',
    bankCard: '',
    email: '',
    password: '',
    checkpassword: '',
    type: '',
    license: '',
    code: ''
})

const registerFormRef = ref<FormInstance>()
const uploadRef = ref<UploadInstance>()

const identifyCode = ref();
const identifyCodes = ref("1234567890abcdefjhijklinopqrsduvwxyz");

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (registerForm.value.checkpassword !== '') {
            if (!registerFormRef.value) return
            registerFormRef.value.validateField('checkpassword', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerForm.value.password) {
        callback(new Error("两次密码输入不一致"))
    } else {
        callback()
    }
}

const validateLicense = (rule: any, value: any, callback: any) => {
    if (value == '') {
        callback(new Error('请上传营业执照'))
    } else {
        callback()
    }
}


const rules = reactive<FormRules>({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    city: [
        { required: true, message: '请输入城市', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '手机号长度为11位', trigger: 'blur'},
        { pattern: /^[0-9]*$/, message: '手机号必须为数字', trigger: 'blur'}
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'change'}
    ],
    bankCard: [
        { required: true, message: '请输入银行卡号', trigger: 'blur' },
        { min: 16, max: 16, message: '银行卡号长度为16位', trigger: 'blur'},
        { pattern: /^[0-9]*$/, message: '银行卡号必须为数字', trigger: 'blur'}
    ],
    email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的电子邮件格式', trigger: ['blur', 'change'] }
    ],
    license: [
        { required: true, validator: validateLicense, trigger: 'change' },
    ],
    password: [
        { validator: validatePass, required: true, trigger: 'blur' }
    ],
    checkpassword: [
        { validator: validatePass2, required: true, trigger: 'blur' }
    ],
    code : [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ]
})

const register = (formEl: FormInstance | undefined) => {
    if(!formEl) return
    formEl.validate((valid) =>{
        if(valid) {
            if(identifyCode.value != registerForm.value.code) {
                alert("请输入正确的验证码")
                refreshCode()
            }
            else {
                // console.log("注册成功")
                const md5password = md5(registerForm.value.password)
                //将待提交表单封装进data
                const data = {
                    userName: registerForm.value.userName,
                    name: registerForm.value.name,
                    city: registerForm.value.city,
                    phone: registerForm.value.phone,
                    gender: registerForm.value.gender,
                    bankCard: registerForm.value.bankCard,
                    email: registerForm.value.email,
                    password: md5password,
                    type: '商家',
                    license: registerForm.value.license,
                    checkpassword: ''
                } as RegisterData
                // 调用@api/register注册
                userRegister(data).then((res) => {
                    console.log(res)
                    if(res.code == 200) {
                        ElMessage({
                            type: 'success',
                            message: res.message,
                        })
                        router.push('/userlogin')
                    }
                    else {
                        ElMessage({
                            type: 'error',
                            message: res.message,
                        })
                        refreshCode()
                    }
                })
            }
        }
        else {
            alert("注册失败")
            refreshCode()
            return false
        }
    })
}

// 重置表单
// 参数formEL只能是FormInstance类型或者undefined
const resetForm = (formEl: FormInstance | undefined) => {
    formEl.resetFields()
    // uploadRef.value.clearFiles()
}

const refreshCode = () => {
    identifyCode.value = ""
    makeCode(4)
}

const makeCode = (len : number) => {
    for (let i = 0; i < len; i++) {
        identifyCode.value += identifyCodes.value[randomNum(0, identifyCodes.value.length)];
    }
}

const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

onMounted(() => {
    refreshCode()
})

function runUserRegister() {
    router.push('/userregister')
}

const handleSuccess = (response: any) => {
    registerForm.value.license = response.data
};

const beforeUpload = (file: File) => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt500K = file.size / 1024 < 500

    if (!isJPGorPNG) {
        // 使用你自己的消息提示库，例如 Element Plus 的 ElMessage
        ElMessage.error('只能上传 JPG/PNG 格式的图片')
    }
    if (!isLt500K) {
        ElMessage.error('上传图片大小不能超过 500KB')
    }
    return isJPGorPNG && isLt500K
}

</script>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.register-card {
    width: 625px;
}

.register-form {
    padding: 20px;
}

.upload-demo {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
}
</style>