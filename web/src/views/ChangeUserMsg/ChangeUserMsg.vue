<template>
  <div class="register-container">
    <el-card class="register-card" shadow="always">
      <div class="register-form">
        <h2>用户注册</h2>
        <el-form ref="changeFormRef" :model="changeForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="changeForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="changeForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="changeForm.city" placeholder="请输入城市"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="changeForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="changeForm.gender" placeholder="请选择性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号" prop="bankcard">
            <el-input v-model="changeForm.bankCard" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="changeForm.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="个人简介" prop="email">
            <el-input v-model="changeForm.introduction" placeholder="请输入个人简介"></el-input>
          </el-form-item>
          <el-form-item label="修改头像" prop="product_img">
            <el-upload
                class="upload-demo"
                action="http://localhost:8080/user/uploadImg"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="修改微信" prop="wechat">
            <el-input v-model="changeForm.wechat" placeholder="微信号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, ref} from "vue";
import {ElButton, ElFormItem, ElMessage, FormInstance, FormRules} from "element-plus";
import {User} from "@/views/ChangeUserMsg/type/User";
import {ChangeUserMsg, GetAllUserMsg} from "@/api/User";
import {useRouter} from "vue-router";

const changeForm = ref<User>({
  id:0,
  userName:'',
  name:'',
  city:'',
  phone:'',
  gender:'',
  bankCard:'',
  email:'',
  introduction:'',
  wechat:'',
  img:''
});
const user_id = ref(1);
//TODO 从cookie中获取用户id

const router = useRouter();
onBeforeMount(()=>{
  getAllMsg();//获取用户的基本信息
})
//获取用户当前信息
function getAllMsg(){
  GetAllUserMsg(user_id.value).then(res=>{
    changeForm.value = res.data;
  }).catch(err=>{
    console.log("error"+err)
  })
}

/*更改头像部分*/
const handleSuccess = (response: any) => {
  changeForm.value.img=response.data;
};

const beforeUpload = (file: File) => {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt500K = file.size / 1024 < 500;

  if (!isJPGorPNG) {
    // 使用你自己的消息提示库，例如 Element Plus 的 ElMessage
    ElMessage.error('只能上传 JPG/PNG 格式的图片');
  }
  if (!isLt500K) {
    ElMessage.error('上传图片大小不能超过 500KB');
  }
  return isJPGorPNG && isLt500K;
};

const changeFormRef = ref<FormInstance>()
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
    { required: true, message: '请输入手机号', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change'}
  ],
  bankcard: [
    { required: true, message: '请输入银行卡号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的电子邮件格式', trigger: ['blur', 'change'] }
  ]
})
//上传修改
function submit(){
  console.log(changeForm.value);
  ChangeUserMsg(changeForm.value).then(res=>{
    if(res.code==200){
      ElMessage.success("修改成功")
      setTimeout(() => {
        router.push({path: '/userzone', query: {id: changeForm.value.id}})
      }, 2000);
    }
  }).catch(err=>{
    console.log("error"+err)
  })
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