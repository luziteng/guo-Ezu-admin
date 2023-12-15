<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>盲盒商品设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form
          ref="infoForm"
          :rules="infoRules"
          :model="infoForm"
          label-width="120px"
        >
          <el-form-item label="盲盒价格">
            <el-input
              type="number"
              v-model="infoForm.price"
              placeholder="请输入盲盒价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="盲盒类型设置">
            <el-table :data="specData" stripe style="width: 100%">
              <el-table-column prop="productName" label="商品名称" width="140">
                <template slot-scope="scope">
                  <el-input
                    @blur="checkSkuOnly(scope.$index, scope.row)"
                    size="mini"
                    v-model="scope.row.productName"
                    placeholder="输入商品名称"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="productSpec" label="型号/规格" width="130">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.productSpec"
                    placeholder="如1斤/条"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="productPrice" label="成本" width="100">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.productPrice"
                    placeholder="成本"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="productStock" label="库存" width="100">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.productStock"
                    placeholder="库存"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="probability" label="中奖概率" width="120">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.probability"
                    placeholder="概率（%）"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="开奖盲盒图片" width="160">
                <upload-img
                  :file-list="specData.fileList"
                  :is-put-oss="true"
                  :max-count="1"
                  :oss-path-prefix="'goods'"
                  @input="uploadSuccess"
                />
              </el-table-column>
              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="specDelete(scope.$index, scope.row)"
                  >
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="spec-wrap">
              <el-button class="marginTop20" @click="addSpecData"
                >新增盲盒</el-button
              >
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="marginTop20" @click="cancelBox" type="danager">取消</el-button>
            <el-button class="marginTop20" @click="savaBox" type="pramary">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/api/goods";
import UploadImg from "../../common/components/UploadImg.vue";
export default {
  components: {
    UploadImg,
  },
  data() {
    return {
      infoForm: {
        price: "",
      },
      specData: [
        {
          productName: "",
          productSpec: "",
          productPrice: "",
          productStock: "",
          fileList: [],
        },
      ],
    };
  },
  methods: {
    addSpecData() {
      let ele = {
        productName: "",
        productSpec: "",
        productPrice: "",
        productStock: "",
      };
      this.specData.push(ele);
    },
    cancelBox(){
      let payload = {

      }
      http.createBox().then(res=>{

      })
    },
    savaBox() {},
    uploadSuccess(data) {
      console.log("this", data, this.infoForm);
      // this.$set(this.infoform, 'fileList', data)
      this.infoForm.fileList = [...data];
      this.infoForm.list_pic_url = data.map(({ url }) => url);
      console.log("imageData-----", data, this.infoForm.list_pic_url);
    },
  },
};
</script>
<style scoped>
.marginTop20 {
  margin-top: 20px;
}
</style>
