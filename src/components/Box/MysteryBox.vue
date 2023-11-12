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
              <el-table-column prop="goods_sn" label="商品名称" width="140">
                <template slot-scope="scope">
                  <el-input
                    @blur="checkSkuOnly(scope.$index, scope.row)"
                    size="mini"
                    v-model="scope.row.goods_sn"
                    placeholder="输入商品名称"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="型号/规格" width="130">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.value"
                    placeholder="如1斤/条"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="cost" label="成本(元)" width="100">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.cost"
                    placeholder="成本"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="goods_number" label="库存" width="100">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.goods_number"
                    placeholder="库存"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="goods_number" label="中奖概率" width="120">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.goods_number"
                    placeholder="概率（%）"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="开奖盲盒图片" width="160">
                <el-upload
                  name="file"
                  ref="upload"
                  class="upload-demo"
                  :action="qiniuZone"
                  :on-success="handleSuccess"
                  :before-upload="indexImgBefore"
                  :auto-upload="true"
                  list-type="picture-card"
                  :data="picData"
                  :http-request="uploadIndexImg"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件
                  </div>
                </el-upload>
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
              <el-button class="marginTop20" type="primary" @click="addSpecData"
                >新增盲盒</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoForm: {
        price: "",
      },
      specData: [
        {
          goods_sn: "",
          value: "",
          cost: "",
          retail_price: "",
          goods_weight: "",
          goods_number: "",
        },
      ],
    };
  },
  methods: {
    addSpecData() {
      let ele = {
        goods_sn: "",
        value: "",
        cost: "",
        retail_price: "",
        goods_weight: "",
        goods_number: "",
      };
      this.specData.push(ele);
    },
  },
};
</script>
<style scoped>
.marginTop20 {
  margin-top: 20px;
}
</style>
