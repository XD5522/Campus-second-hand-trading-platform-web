<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="1">用户列表</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item @click="LoginOut">退出登录</el-menu-item>
    </el-menu>
    <div class="search">
        <el-card style="margin: 20px">
            <template #header>
                <div class="card-header">
                    <div>
                        <el-icon><Search /></el-icon>
                        <span style="margin: 10px">筛选搜索</span>
                    </div>
                    <div>
                        <el-button @click="resetForm(searchFormRef)">重置</el-button>
                        <el-button type="primary">搜索</el-button>
                    </div>
                </div>
            </template>
            <div class="search-form">
                <el-form ref="searchFormRef" :model="searchForm">
                    <el-form-item label="输入搜索：" prop="search">
                        <el-input style="width: 20%" v-model="searchForm.search"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
    <div class="dataForm">
        <el-card style="margin: 20px">
            <el-table
                :data="dataList.List"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                border
                style="width: 100%"
            >
                <el-table-column prop="id" label="ID" width="70px" />
                <el-table-column prop="userName" label="用户名" width="150px" />
                <el-table-column prop="name" label="姓名" width="100px" />
                <el-table-column prop="type" label="用户类型" width="100px" />
                <el-table-column prop="phone" label="手机号" width="200px"/>
                <el-table-column prop="bankCard" label="银行卡号" width="200px"/>
                <el-table-column prop="state" label="状态" width="100px"/>
                <el-table-column label="操作" width="334px">
                    <template #default="scope">
                        <el-button type="danger"  v-if="!isBan(scope.row.state)" @click="banThisUser(scope.row.userName, scope.row.id)">封禁</el-button>
                        <el-button type="warning" v-if="isBan(scope.row.state)" @click="passThisUser(scope.row.userName, scope.row.id)">解禁</el-button>
                        <el-button type="info" @click="deleteThisUser(scope.row.userName, scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:page-size="data.pageData.pagesize"
                @size-change="sizeChange"
                @current-change="currentChange"
                layout="prev, pager, next"
                :total="data.pageData.count">
            </el-pagination>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import {computed, onBeforeMount, reactive, ref} from "vue";
import {banUser, deleteUser, getAllUser, passUser} from "@/api/AdminGetData";
import {InitData} from "@/views/Admin_Main/type/User"
import {delAdminToken} from "@/api/cookie";
import router from "@/router";
import {
    Search
} from '@element-plus/icons-vue'
import {FormInstance} from "element-plus";

const data = reactive(new InitData())
const dataList = reactive({
    List: computed(() => {
        return data.list.slice(
            (data.pageData.page - 1) * data.pageData.pagesize,
            data.pageData.page * data.pageData.pagesize
        )
    })
})

const searchForm = ref({
    search : ''
})

const searchFormRef = ref<FormInstance>()

function LoginOut() {
    delAdminToken()
    router.push('/AdminLogin')
}

onBeforeMount(() => {
    getAllUser().then((res) => {
        data.list = res.data
        data.pageData.count = res.data.length
        console.log(data.pageData.count)
        console.log(data.list)
    })
})



const isBan = (state : string) => {
    if(state == "正常") return false
    return true
}

function passThisUser(userName : string, id : number) {
    passUser(userName);
    data.list.forEach((item, i) => {
        if(item.id == id) {
            data.list[i].state = "正常"
        }
    })
}

function banThisUser(userName : string, id : number) {
    banUser(userName);
    data.list.forEach((item, i) => {
        if(item.id == id) {
            data.list[i].state = "封禁"
        }
    })
}

function deleteThisUser(userName : string, id : number) {
    deleteUser(userName);
    data.list.forEach((item, i) => {
        if(item.id == id) {
            data.list.splice(i, 1);
        }
    })

}

const sizeChange = (pagesize : number) => {
    data.pageData.pagesize = pagesize
}

const currentChange = (page : number) => {
    data.pageData.page = page
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<style>
.flex-grow {
    flex-grow: 1;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-form {
    margin: 10px 30px;
}
</style>