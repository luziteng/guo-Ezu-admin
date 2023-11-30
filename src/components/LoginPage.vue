<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="static/images/loading.gif" />
      </div>
      <div class="body">
        <p class="tips">果E族管理系统</p>
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="密码"
              @keyup.enter.native="startLogin"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="startLogin"
              :loading="loading"
              style="width: 100%"
            >
              {{ loading ? "登录中..." : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";
import _http from'@/api/user'
export default {
  data() {
    return {
      root: "",
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码不得低于6个字符", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  components: {},
  methods: {
    startLogin() {
      console.log("<<<<<<<<==================>>>>>>>>");
      console.log(123123);
      console.log("<<<<<<<<==================>>>>>>>>");
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        let datas = {
          adminKey: this.form.username,
          adminPassword: this.form.password,
        }
        _http.login(datas).then((res) => {
            this.loading = false;
            // 无token直接跳转
            if (res.code === 200) {
              console.log('tokenValue',res.data.tokenValue)
              localStorage.setItem("token",res.data.tokenValue);
              localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.adminKey)
              );
              this.$router.push({ name: "welcome" });
              let sUserAgent = navigator.userAgent;
              // todo 手机端
              let mobileAgents = [
                "Android",
                "iPhone",
                "Symbian",
                "WindowsPhone",
                "iPod",
                "BlackBerry",
                "Windows CE",
              ];
              let goUrl = 0;
              for (var i = 0; i < mobileAgents.length; i++) {
                if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
                  goUrl = 1;
                  break;
                }
              }
              console.log(goUrl);
              if (goUrl == 1) {
                this.$router.push({ name: "wap" });
              }
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
              return false;
            }
          })
          .catch((err) => {
            this.loading = false;
          });
       
      });
    },
  },
  mounted() {
    this.root = api.rootUrl;
  },
};
</script>
<style>
.login {
  align-items: center;
  background: url("https://www.qile.club/img/back.jpg");
  /* 以上为登录背景,可以自己更换成自己喜欢的 */
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  font-family: Lato, Helvetica, sans-serif;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  color: #656565;
}

.login-box {
  width: 320px;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 12px #ccc;
}

.login-box .logo {
  height: 100px;
  padding-top: 30px;
  /*background: #324157;*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box .logo img {
  width: 80px;
  height: 80px;
}

.login-box .body {
  padding: 10px 30px 30px 30px;
}

.login-box .body .tips {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 30px;
}

.login-box .body .author {
  display: block;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #656565;
  margin-bottom: 10px;
  text-decoration: none;
}

.login-box .body .author a {
  text-decoration: none;
}
</style>
