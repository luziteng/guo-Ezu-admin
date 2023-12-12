<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'nature' }"
          >商品设置</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{
          infoForm.id ? "编辑分类" : "添加分类"
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left"
          >返回列表</el-button
        >
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form
          ref="infoForm"
          :rules="infoRules"
          :model="infoForm"
          label-width="120px"
        >
          <!-- <el-form-item label="上级分类" prop="name">
                        <el-select v-model="infoForm.parent_id" placeholder="请选择上级分类">
                            <el-option v-for="item in parentCategory" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item> -->
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="简短介绍">
            <el-input
              type="textarea"
              v-model="infoForm.front_name"
              :rows="1"
            ></el-input>
            <div class="form-tip"></div>
          </el-form-item> -->
          <el-form-item label="分类图片" prop="img_url">
            <upload-img
              :fileList="infoForm.fileList"
              :is-put-oss="true"
              :oss-path-prefix="'goods'"
              @input="uploadSuccess"
              :max-count="1"
            />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number
              v-model="infoForm.sort_order"
              :min="1"
              :max="1000"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
            <el-button @click="goBackPage">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/goods";
import UploadImg from "../../common/components/UploadImg.vue";
const dayjs = require('dayjs')
export default {
  data() {
    return {
      root: "",
      qiniuZone: "",
      parentCategory: [
        {
          id: 0,
          name: "顶级分类",
        },
      ],
      infoForm: {
        id: 0,
        name: "",
        // parent_id: 0,
        front_name: "",
        img_url: "",
        sort_order: 100,
        icon_url: "",
        // is_show: true,
        fileList: [],
      },
      infoRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        front_name: [
          { required: true, message: "请输入简介", trigger: "blur" },
        ],
        img_url: [
          { required: true, message: "请选择分类图片", trigger: "blur" },
        ],
        icon_url: [
          { required: true, message: "请选择分类图标", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 查询分类
    categoryMessage() {
      let param = {
        id: this.infoForm.id,
      };
      http.checkCategory(param).then((res) => {
        if (res.code === 200) {
          console.log('121212',this.$dayjs().valueOf())
          const { categoryName, categoryPicture, categorySort, id } = res.data;
          this.infoForm = {
            name: categoryName,
            img_url: categoryPicture,
            sort_order: categorySort,
            id,
            fileList:[{
              uid:this.$dayjs().valueOf(),
              url:categoryPicture,
              status:'success',
              name: this.$dayjs().valueOf()
            }]
          };
        }
        console.log("message", res);
      });
    },
    beforeBannerRemove(file, fileList) {
      return this.$confirm(`确定移除该图？删除后将无法找回`);
    },

    goBackPage() {
      this.$router.go(-1);
    },
    onSubmitInfo() {
      this.infoForm.level = this.infoForm.parent_id == 0 ? "L1" : "L2";
      console.log(this.infoForm.level);
      this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          const { name, img_url, sort_order } = this.infoForm;
          let params = {
            parentId: 0,
            categoryType: 1,
            categoryName: name,
            categoryPicture: img_url,
            categoryStatus: 0,
            categorySort: sort_order,
          };
          http.createcategory(params).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "保存成功",
              });
              this.$router.go(-1);
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
    handleUploadBannerSuccess(res, file) {
      let url = this.url;
      this.infoForm.img_url = url + res.key;
    },
    handleUploadIconSuccess(res, file) {
      let url = this.url;
      this.infoForm.icon_url = url + res.key;
    },
    getTopCategory() {
      this.axios.get("category/topCategory").then((response) => {
        this.parentCategory = this.parentCategory.concat(response.data.data);
      });
    },
    getInfo() {
      if (this.infoForm.id <= 0) {
        return false;
      }
      //加载分类详情
      let that = this;
      this.axios
        .get("category/info", {
          params: {
            id: that.infoForm.id,
          },
        })
        .then((response) => {
          let resInfo = response.data.data;
          console.log(resInfo);
          let data = {
            name: "分类图",
            url: resInfo.img_url,
          };
          this.fileList.push(data);
          let iconData = {
            name: "图标",
            url: resInfo.icon_url,
          };
          this.fileList2.push(iconData);
          that.infoForm = resInfo;
        });
    },
    /**
     * @description:图片/文件上传线上成功返回
     * @param  {*}
     * @return {*}
     * @param {*} data 文件信息及线上链接
     */
    uploadSuccess(data) {
      this.infoForm.fileList = data;
      this.infoForm.img_url = data[0].url;
      // console.log("imageData-----", this.infoForm.fileList,data,  this.infoForm);
    },
  },
  mounted() {
    // this.getTopCategory();
    this.infoForm.id = this.$route.query.id || 0;
    if (this.infoForm.id) {
      this.categoryMessage();
    }
    // this.getInfo();
    // this.root = api.rootUrl;
    // this.qiniuZone = api.qiniu;
  },
  components: {
    UploadImg,
  },
};
</script>

<style scoped>
.image-uploader {
  height: 105px;
}

.image-uploader .el-upload {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.image-uploader .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 105px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-show {
  background-color: #f8f8f8;
  min-width: 105px;
  height: 105px;
  display: block;
}
</style>
