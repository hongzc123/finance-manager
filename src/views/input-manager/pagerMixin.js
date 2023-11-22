import { columns, pager } from "./conf";

export default {
    data() {
        return {
            pager: {
                ...pager // pageNo:1 pageSize:10
            },
            columns,
            tableData: [],
        }
    },
    methods: {
        changeQuery(query) {
            console.log("changeQuery", query);
            this.pager.name = query; // name不需要实时在页面上更新的，无需$set
            this.pager.pageNo = 1;
            this.load();
        },
        sizeChange(v) {
            // console.log("sizeChange", v);
            this.pager.pageSize = v;
            this.pager.pageNo = 1;
            this.load();
        },
        currentChange(v) {
            // console.log("currentChange", v);
            this.pager.pageNo = v;
            this.load();
        },
    }
}