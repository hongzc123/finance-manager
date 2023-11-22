import request from '@/utils/request';

export default {
    // 混入时生命周期函数都会执行，组件后执行
    // 函数：完全覆盖
    methods: {
        async load() {
            this.loading = true;
            // const res = await getPersonList(this.pager);
            const res = await request({
                ...searchOption, // url, method
                params: this.pager
            });

            this.loading = false;
            this.tableData = res.data.list;
            this.pager.rows = res.data.pager.rows;
        }
    }
}