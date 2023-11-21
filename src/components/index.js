import Vue from 'vue'
import GMenu from './GMenu/GMenu.vue'
import GMenuItem from './GMenu/GMenuItem.vue'
import GFormCreated from './GFormCreated/Index.vue'
import GBreadcrumb from './GBreadcrumb/Index.vue'
import GDropdown from './GDropdown/Index.vue'
import GFlipper from './GFlipper/Index.vue'
import GTable from './GTable/Index.vue'
import GColumn from './GTable/GColumn.vue'
import GChart from './GChart/Index.vue'

Vue.component(GMenu.name, GMenu)
Vue.component(GMenuItem.name, GMenuItem)
Vue.component(GFormCreated.name, GFormCreated)
Vue.component(GBreadcrumb.name, GBreadcrumb)
Vue.component(GDropdown.name, GDropdown)
Vue.component(GFlipper.name, GFlipper)
Vue.component(GTable.name, GTable)
Vue.component(GColumn.name, GColumn)
Vue.component(GChart.name, GChart)