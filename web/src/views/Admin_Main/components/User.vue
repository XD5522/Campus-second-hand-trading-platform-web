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
                        <el-button type="primary" @click="searchData">搜索</el-button>
                    </div>
                </div>
            </template>
            <div class="search-form">
                <el-form ref="searchFormRef" :model="searchForm">
                    <el-form-item label="用户名：" prop="search">
                        <el-input style="width: 20%" v-model="searchForm.search"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
    <div class="dataForm">
        <el-card style="margin: 20px">
            <el-table
                :data="data.list"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                border
                style="width: 100%"
            >
                <el-table-column prop="id" label="ID" width="70px" />
                <el-table-column prop="userName" label="用户名" width="125px" />
                <el-table-column prop="name" label="姓名" width="100px" />
                <el-table-column prop="type" label="用户类型" width="100px" />
                <el-table-column prop="city" label="城市" width="100px"/>
                <el-table-column prop="img" label="图片" width="200px">
                    <template v-slot="scope">
                        <div>
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="imgpath+scope.row.img"
                                :preview-src-list="[imgpath+scope.row.img]"
                                :hide-on-click-modal="true"
                                :preview-teleported="true"
                            >
                            </el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="license" label="营业执照" width="200px">
                    <template v-slot="scope">
                        <div>
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="imgpath+scope.row.license"
                                :preview-src-list="[imgpath+scope.row.license]"
                                :hide-on-click-modal="true"
                                :preview-teleported="true"
                            >
                            </el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="状态" width="100px"/>
                <el-table-column label="操作" width="243px">
                    <template #default="scope">
                        <el-button type="danger"  v-if="!isBan(scope.row.state)" @click="banThisUser(scope.row.userName, scope.row.id)">封禁</el-button>
                        <el-button type="warning" v-if="isBan(scope.row.state)" @click="passThisUser(scope.row.userName, scope.row.id)">解禁</el-button>
                        <el-button type="info" @click="deleteThisUser(scope.row.userName, scope.row.id)">删除</el-button>
                        <el-button type="primary">编辑</el-button>
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
import {computed, onBeforeMount, reactive, ref, watch} from "vue";
import {banUser, deleteUser, getAllUser, passUser, searchUser} from "@/api/AdminGetData";
import {InitUserData, User} from "@/views/Admin_Main/type/User"
import {delAdminToken} from "@/api/cookie";
import router from "@/router";
import {
    Search
} from '@element-plus/icons-vue'
import {FormInstance} from "element-plus";

const data = reactive(new InitUserData())

const searchForm = ref({
    search : ''
})

const searchFormRef = ref<FormInstance>()

const imgpath = "http://101.43.208.136:9090/mall"

function LoginOut() {
    delAdminToken()
    router.push('/AdminLogin')
}

onBeforeMount(() => {
    getAllUser().then((res) => {
        data.list = res.data
        data.pageData.count = res.data.length
    })
})



const isBan = (state : string) => {
    return state != "正常";

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
    searchData()
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

function searchData() {
    searchUser(searchForm.value.search, data.pageData.page, data.pageData.pagesize).then((res) => {
        console.log(res)
        data.list = res.data
        data.pageData.count = res.data.length
    })
}

watch([() => searchForm.value.search], () => {
    if(searchForm.value.search == '') {
        getAllUser().then((res) => {
            data.list = res.data
            data.pageData.count = res.data.length
        })
    }
})

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