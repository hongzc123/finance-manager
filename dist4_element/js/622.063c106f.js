"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[622],{2622:function(r,s,e){e.r(s),e.d(s,{default:function(){return o}});e(560);var t=e(7877),a={data(){return{ruleForm:{account:"admin",password:"approve123456."},rules:{password:[{required:!0,trigger:"blur",message:"请输入密码"}],account:[{required:!0,trigger:"blur",message:"请输入用户名"}]}}},methods:{submitForm(r){this.$refs[r].validate((async r=>{if(!r)return!1;{await(0,t.XR)(this.ruleForm);let r=this.$route.query.redirect;this.$route.query,this.$router.push(r||"/dashboard")}}))},resetForm(r){this.$refs[r].resetFields()}}},o=(0,e(1001).Z)(a,(function(){var r=this,s=r._self._c;return s("div",{staticClass:"login-container"},[s("div",{staticClass:"login-box center"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:r.ruleForm,"status-icon":"",rules:r.rules}},[s("el-form-item",{attrs:{prop:"account"}},[s("el-input",{attrs:{"prefix-icon":"el-icon-user-solid",clearable:"",placeholder:"请输入用户名"},model:{value:r.ruleForm.account,callback:function(s){r.$set(r.ruleForm,"account",r._n(s))},expression:"ruleForm.account"}})],1),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{attrs:{"prefix-icon":"el-icon-s-order","show-password":"",placeholder:"请输入密码",type:"password",autocomplete:"off"},model:{value:r.ruleForm.password,callback:function(s){r.$set(r.ruleForm,"password",s)},expression:"ruleForm.password"}})],1),s("el-form-item",[s("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(s){return r.submitForm("ruleForm")}}},[r._v("登录")])],1)],1)],1),r._m(0)])}),[function(){var r=this._self._c;return r("div",{staticClass:"stars-box"},[r("div",{staticClass:"star"}),r("div",{staticClass:"star"}),r("div",{staticClass:"star"}),r("div",{staticClass:"star"}),r("div",{staticClass:"star"}),r("div",{staticClass:"star"})])}],!1,null,"5291d438",null).exports}}]);