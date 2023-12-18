"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[739],{6739:function(t,a,e){e.r(a),e.d(a,{default:function(){return d}});var r=e(8265),o=e(9087);const n={attrs:{align:"center"},items:[{label:"园区",prop:"name"},{label:"所在地",prop:"address1"},{label:"备案状态",prop:"status"},{label:"操作",prop:"operation"}]};var s=e(7877),i=e(2325),l=e(9157),c={mixins:[r.Z,o.Z],data(){return{columns:n}},methods:{getOption(){return{read:{url:"/contract/list",method:"get"},create:{url:"/contract/createFile",method:"post"}}},doCreate(t){this.create(t)},async doDownload(t){const{data:a}=await(0,s.Sv)(t);a.data.url,l.H,a.data.url,(0,i.w4)(l.H+a.data.url)},async doDownload2(t){const{data:a}=await(0,s.Sv)(t);a.data.url,l.H,a.data.url;const e=await(0,s.$A)(a.data.url.replace("/api",""));(0,i.AB)(e.data,"备案文件"+t+".docx")}}},d=(0,e(1001).Z)(c,(function(){var t=this,a=t._self._c;return a("div",[a("GQuery",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"请输入查询条件",clearable:""},on:{change:t.changeQuery}}),a("GTable",{attrs:{data:t.tableData,columns:t.columns,pager:t.pager},on:{"size-change":t.sizeChange,"current-change":t.currentChange},scopedSlots:t._u([{key:"status",fn:function({row:e}){return[a("el-tag",{attrs:{type:t._f("statusColor")(e.status),size:"normal"}},[t._v(" "+t._s(t._f("status")(e.status))+" ")])]}},{key:"operation",fn:function({row:e}){return[a("GNotifyBtn",{attrs:{type:"primary",msg:"是否确认生成备案文件？",disabled:5!==e.status},on:{click:function(a){return t.doCreate(e.id)}}},[t._v("生成备案文件")]),a("GNotifyBtn",{attrs:{type:"success",msg:"是否下载生成备案文件？",disabled:7!==e.status},on:{click:function(a){return t.doDownload(e.id)}}},[t._v("下载备案文件")])]}}])})],1)}),[],!1,null,null,null).exports},8265:function(t,a,e){var r=e(8431);a.Z={data(){return{loading:!1}},methods:{getOption(){return!1},checkOption(){const t=this.getOption();if(!t)throw new Error("混入crud组件必须覆写getOption方法");return t},async load(){this.loading=!0;const t=await(0,r.W)({...this.checkOption().read,params:{...this.pager,rows:void 0}});this.loading=!1,this.tableData=t.data.list,this.pager.rows=t.data.pager.rows},async update(t){const a=await(0,r.W)({...this.checkOption().update,data:t});return await this.load(),a},async delete(t){let{del:a}=this.checkOption();const e=await(0,r.W)({...a,url:a.url+"/"+t});return await this.load(),e},async create(t){const a=await(0,r.W)({...this.checkOption().create,data:{id:t}});return await this.load(),a}},created(){this.load()}}},9087:function(t,a,e){var r=e(8253);a.Z={created(){},beforeDestroy(){},data(){return{pager:{...r.h,pageSizes:void 0},tableData:[]}},methods:{changeQuery(t){this.$set(this.pager,"name",t),this.pager.pageNo=1,this.load()},sizeChange(t){this.pager.pageSize=t,this.pager.pageNo=1,this.load()},currentChange(t){this.pager.pageNo=t,this.load()}}}},8253:function(t,a,e){e.d(a,{h:function(){return o},z:function(){return r}});const r={items:Object.freeze([{prop:"birthday",label:"出生日期",width:120,filter:"convertDate"},{prop:"name",label:"姓名",width:120},{label:"性别",prop:"sex",filter:"common"},{prop:"education",label:"教育程度",filter:"common"},{prop:"address1",label:"居住地址"},{prop:"mobile_phone",label:"手机号"},{label:"案件状态",prop:"status",width:100},{label:"操作",prop:"operation",width:300,slot:!0},{label:"配送信息",children:[{label:"地址",children:[{label:"省份",prop:"name"},{label:"市区"},{label:"街道",prop:"address"}]}]},{width:400,label:"备注信息",prop:"name",filter:"common",html(t){return`<div>\n                <h2>${t.row.name}这是自定义html</h2>\n                <button>按钮</button>\n              </div>`}}])},o={pageNo:1,pageSize:10,pageSizes:[10,20,30,40]}}}]);