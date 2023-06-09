<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="1">商品列表</el-menu-item>
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
                    <el-form-item label="商品名：" prop="search">
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
                <el-table-column prop="userName" label="所属商家" width="150px" />
                <el-table-column prop="name" label="商品名" width="100px" />
                <el-table-column prop="type" label="商品类型" width="100px" />
                <el-table-column prop="price" label="价格" width="70px"/>
                <el-table-column prop="stock" label="库存" width="70px"/>
                <el-table-column prop="state" label="状态" width="100px"/>
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
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="success" @click="releaseThisProduct(scope.row.id)">发布</el-button>
                        <el-button type="info" @click="deleteThisProduct(scope.row.id)">删除</el-button>
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
import {delAdminToken} from "@/api/cookie";
import router from "@/router";
import {FormInstance} from "element-plus";
import {InitProjectData} from "@/views/Admin_Main/type/Project";
import {onMounted, reactive, ref, watch} from "vue";
import {deleteProduct, searchAuditProduct, releaseProduct} from "@/api/AdminGetData";
import {
    Search
} from '@element-plus/icons-vue'

const data = reactive(new InitProjectData())

const searchForm = ref({
    search : ''
})

const searchFormRef = ref<FormInstance>()

const imgpath = "http://101.43.208.136:9090/mall"

function LoginOut() {
    delAdminToken()
    router.push('/AdminLogin')
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
    searchAuditProduct(searchForm.value.search, data.pageData.order, data.pageData.asc, data.pageData.page, data.pageData.pagesize).then((res) => {
        data.list = res.data.records
        data.pageData.page = res.data.current
        data.pageData.count = res.data.total
        data.pageData.pagesize = res.data.size
        console.log(data)
        console.log(res)
    }).catch((err) => {
        console.log("error"+err)
    })
}

watch([() => searchForm.value.search], () => {
    if(searchForm.value.search == '') {
        searchData()
    }
})

onMounted(() => {
    searchData()
})

async function releaseThisProduct(id : number) {
    await releaseProduct(id)
    await searchData()
}

function deleteThisProduct(id : number) {
    deleteProduct(id)
    searchData()
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