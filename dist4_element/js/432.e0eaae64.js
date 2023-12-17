"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[432],{9432:function(t,e,a){a.r(e),a.d(e,{default:function(){return o}});var r=a(8265),i=a(9087);const n={attrs:{align:"center"},items:[{label:"用户名",prop:"account"},{label:"创建者",prop:"creator"},{label:"创建者",prop:"creator"},{label:"密码",prop:"password"},{label:"创建时间",prop:"reg_time",filter:"convertDate"},{label:"权限类型",prop:"role_name",filter:"common"}]};var s={mixins:[r.Z,i.Z],data(){return{columns:n,start:0,end:10,viewCount:10,query:""}},computed:{showList(){if(this.end=this.start+this.viewCount,""!==this.query.trim()){const t=this.tableData.filter((t=>t.account.includes(this.query)));return this.pager.rows=t.length,t.slice(this.start,this.end)}return this.tableData.slice(this.start,this.end)}},methods:{getOption(){return{read:{url:"/user/list?type=new",method:"get"}}},sizeChange(t){this.viewCount=t,this.start=0,this.pager.pageSize=t},currentChange(t){this.start=(t-1)*this.viewCount,this.pager.pageNo=t},changeQuery(t){this.query=t,this.start=0,this.pager.rows=this.tableData.length}}},o=(0,a(1001).Z)(s,(function(){var t=this,e=t._self._c;return e("div",[e("GQuery",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"请输入查询条件",clearable:""},on:{change:t.changeQuery}}),e("GTable",{attrs:{data:t.showList,columns:t.columns,pager:t.pager},on:{"size-change":t.sizeChange,"current-change":t.currentChange}})],1)}),[],!1,null,null,null).exports},8265:function(t,e,a){var r=a(8431);e.Z={data(){return{loading:!1}},methods:{getOption(){return!1},checkOption(){const t=this.getOption();if(!t)throw new Error("混入crud组件必须覆写getOption方法");return t},async load(){this.loading=!0;const t=await(0,r.W)({...this.checkOption().read,params:{...this.pager,rows:void 0}});this.loading=!1,this.tableData=t.data.list,this.pager.rows=t.data.pager.rows},async update(t){const e=await(0,r.W)({...this.checkOption().update,data:t});return await this.load(),e},async delete(t){let{del:e}=this.checkOption();const a=await(0,r.W)({...e,url:e.url+"/"+t});return await this.load(),a},async create(t){const e=await(0,r.W)({...this.checkOption().create,data:{id:t}});return await this.load(),e}},created(){this.load()}}},9087:function(t,e,a){var r=a(8253);e.Z={created(){},beforeDestroy(){},data(){return{pager:{...r.h,pageSizes:void 0},tableData:[]}},methods:{changeQuery(t){this.$set(this.pager,"name",t),this.pager.pageNo=1,this.load()},sizeChange(t){this.pager.pageSize=t,this.pager.pageNo=1,this.load()},currentChange(t){this.pager.pageNo=t,this.load()}}}},8253:function(t,e,a){a.d(e,{h:function(){return i},z:function(){return r}});const r={items:Object.freeze([{prop:"birthday",label:"出生日期",width:120,filter:"convertDate"},{prop:"name",label:"姓名",width:120},{label:"性别",prop:"sex",filter:"common"},{prop:"education",label:"教育程度",filter:"common"},{prop:"address1",label:"居住地址"},{prop:"mobile_phone",label:"手机号"},{label:"案件状态",prop:"status",width:100},{label:"操作",prop:"operation",width:300,slot:!0},{label:"配送信息",children:[{label:"地址",children:[{label:"省份",prop:"name"},{label:"市区"},{label:"街道",prop:"address"}]}]},{width:400,label:"备注信息",prop:"name",filter:"common",html(t){return`<div>\n                <h2>${t.row.name}这是自定义html</h2>\n                <button>按钮</button>\n              </div>`}}])},i={pageNo:1,pageSize:10,pageSizes:[10,20,30,40]}}}]);