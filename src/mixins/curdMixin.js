import { request } from '@/utils/request'

export default {
    // 混入时生命周期函数都会执行，组件后执行
    // 函数：完全覆盖
    methods: {
        // 外部来覆写这个方法
        getOption() {
            return false
        },
        checkOption() {
            const option = this.getOption()
            if (!option) throw new Error('混入crud组件必须覆写getOption方法')
            return option
        },
        async load() {
            this.loading = true;
            const res = await request({
                ...this.checkOption().read, // url, method
                params: {
                    ...this.pager,
                    rows: undefined
                }
            });
            this.loading = false;
            this.tableData = res.data.list;
            this.pager.rows = res.data.pager.rows;
        },
        async update(entry) {
            const res = await request({
                ...this.checkOption().update, // url, method
                data: entry
            });
            await this.load();
            return res
        },
        async delete(id) {
            let { del } = this.checkOption()
            const res = await request({
                ...del, // url, method
                url: del.url + '/' + id
            });
            await this.load();
            return res
        }
    },
    created() {
        this.load();
    }
}