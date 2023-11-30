<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <!-- <router-link to="/dashboard/user"> -->
        <el-button type="primary" icon="plus" @click="dialogFormVisible = true"
          >添加管理员</el-button
        >
        <!-- </router-link> -->
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="60"></el-table-column>
          <el-table-column prop="adminKey" label="会员名称"></el-table-column>
          <el-table-column
            prop="last_login_time"
            label="最近登录"
            width="200"
          ></el-table-column>
          <!-- <el-table-column prop="last_login_ip" label="登录IP" width="200"></el-table-column> -->
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleRowEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <!-- <el-button v-if="scope.row.id != loginInfo.id" plain size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form
        ref="infoForm"
        :rules="infoRules"
        :model="infoForm"
        label-width="120px"
      >
        <el-form-item label="管理员用户名" prop="adminKey">
          <el-input
            v-model="infoForm.adminKey"
            placeholder="请输入管理员名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adminPassword">
          <el-input
            type="adminPassword"
            v-model="infoForm.adminPassword"
            placeholder="输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/api/user";
export default {
  data() {
    return {
      page: 1,
      total: 0,
      tableData: [],
      loginInfo: null,
      dialogFormVisible: false,
      infoForm: {
        adminKey: "",
        adminPassword: "",
      },
      infoRules: {
        adminKey: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        adminPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleRowEdit(index, row) {
      this.$router.push({
        name: "admin_add",
        query: { id: row.id, name: row.adminKey },
      });
    },
    handleRowDelete(index, row) {
      console.log(row);
      this.$confirm("确定要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.axios.post("admin/deleAdmin", { id: row.id }).then((response) => {
          console.log(response.data);
          if (response.data.errno === 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          }
        });
      });
    },
    onSubmitFilter() {
      this.page = 1;
      this.getList();
    },
    getList() {
      let params = {
        adminKey: "",
      };
      http.userList(params).then((response) => {
        this.tableData = response.data.list;
        console.log(this.tableData);
      });
    },
    registerUser() {
      this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          let params = {
            adminKey: this.infoForm.adminKey,
            adminPassword: this.infoForm.adminPassword,
          };
          http.registerUser(params).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "保存成功",
              });
			  this.getList();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                type: "error",
                message: "保存失败",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  components: {},
  mounted() {
    this.getList();
    if (!this.loginInfo) {
      this.loginInfo = JSON.parse(
        window.localStorage.getItem("userInfo") || null
      );
    }
  },
};
</script>

<style scoped></style>
