<template>
    <el-dialog
        title="首页轮播图设置"
        :visible="visible"
        :before-close="onCancel">
        <el-form
          ref="form"
          :rules="formRules"
          :model="form"
          label-width="120px"
        >
          <el-form-item label="图片" prop="picture">
            <upload-img
              :fileList="imgFileList"
              :is-put-oss="true"
              :oss-path-prefix="'goods'"
              @input="uploadSuccess"
              @onRemove="handleRemovePic"
            >
                <!-- <img v-if="form.picture" :src="form.picture" class="picture">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            </upload-img>
          </el-form-item>
          <el-form-item label="跳转地址" prop="url">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onConfirm">确定{{form.id ? '修改' : '添加'}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import UploadImg from "../../common/components/UploadImg.vue";

export default {
    components: {
        UploadImg
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        defaultData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            form: {
                picture: '',
                url: '',
                icon: ''
            },
            formRules: {
                picture: [
                    { required: true, message: '请选择图片', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请填写跳转地址', trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        defaultData: {
            handler(val) {
                this.form = val
            },
            immediate: true
        }
    },
    computed: {
        imgFileList() {
            if (!this.form.picture) {
                return []
            }
            return [{
                name: this.form.picture,
                url: this.form.picture
            }]
        }
    },
    methods: {
        uploadSuccess(data) {
            console.log('上传成功', data)
            this.form.picture = data[0].url
        },
        handleRemovePic(file) {
            this.form.picture = ''
        },
        onCancel() {
            this.$emit('onCancel')
        },
        onConfirm() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return
                }
                this.$emit('onConfirm', this.form)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.picture {
    width: 148px;
    height: 148px;
}
</style>
