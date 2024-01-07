<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item>首页轮播图管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClickTab">
            <el-tab-pane label="轮播图设置" name="setting">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column label="图片" width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.picture " class="table-img">
                        </template>
                    </el-table-column>
                    <el-table-column label="跳转地址">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.url }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="180">
                        <template slot="header">
                            <el-button type="primary" @click="handleOpenBannerDialog">添加图片</el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <BannerAddDialog
            v-if="bannerDialogVisible"
            :visible="bannerDialogVisible"
            :defaultData="dialogDefaultData"
            @onCancel="handleCloseDialog"
            @onConfirm="handleConfirmDialog"/>
    </div>
</template>

<script>
import http from "@/api/banner";
import BannerAddDialog from './BannerAddDialog.vue'

export default {
    components: {
        BannerAddDialog
    },
    data() {
        return {
            tableData: [],
            activeName: 'setting',
            bannerDialogVisible: false,
            dialogDefaultData: {
                id: '',
                picture: '',
                icon: '',
                url: ''
            }
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            http.fetchBannerList().then((res) => {
                if (res.code === 200) {
                    this.tableData = res.data
                }
            })
        },
        handleClickTab() {
        },
        handleEdit(row) {
            this.dialogDefaultData = {...row}
            this.bannerDialogVisible = true
        },
        handleDelete(row) {
            http.deleteBanner({id: row.id}).then((res) => {
                if (res.code === 200) {
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.initData()
                }
            })
        },
        handleOpenBannerDialog() {
            this.bannerDialogVisible = true
        },
        handleCloseDialog() {
            this.bannerDialogVisible = false
            this.dialogDefaultData = {
                id: '',
                picture: '',
                icon: '',
                url: ''
            }
        },  
        handleConfirmDialog(formData) {
            if(formData.id) {
                this.handleUpdateBanner(formData)
                return
            }
            this.handleInsertBanner(formData)
        },
        handleInsertBanner(formData) {
            http.insertBanner(formData).then((res) => {
                if (res.code === 200) {
                    this.bannerDialogVisible = false
                    this.$message({
                        type: "success",
                        message: "添加成功",
                    });
                    this.initData()
                }
            })
        },
        handleUpdateBanner(formData) {
            http.updateBanner(formData).then((res) => {
                if (res.code === 200) {
                    this.bannerDialogVisible = false
                    this.$message({
                        type: "success",
                        message: "修改成功",
                    });
                    this.initData()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.table-img {
    width: 100px;
    height: auto;
}
</style>
