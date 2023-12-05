import { pager } from "@/views/input-manager/conf";

export default {
    created() {
        console.log('组件被创建')
    },
    beforeDestroy() {
        console.log('组件被销毁')
    },
    data() {
        return {
            pager: {
                ...pager, // pageNo:1 pageSize:10
                pageSizes: undefined
            },
            tableData: [],
        }
    },
    methods: {
        changeQuery(query) {
            // this.pager.name = query; // name不需要实时在页面上更新的，无需$set
            this.$set(this.pager, 'name', query)
            this.pager.pageNo = 1;

            // this.pager = {
            //     ...this.pager,
            //     name: query,
            //     pageNo: 1
            // }
            this.load();
        },
        sizeChange(v) {
            this.pager.pageSize = v;
            this.pager.pageNo = 1;
            this.load();
        },
        currentChange(v) {
            this.pager.pageNo = v;
            this.load();
        },
    }
}