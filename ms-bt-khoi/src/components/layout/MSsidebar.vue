<template>
    <div class="m-sidebar">
            <ms-sidebar-header/>
            <ms-sidebar-menu/>
        </div>
</template>

<script>
import MsSidebarHeader from '@/components/sidebar/MSsidebar-header.vue'
import MsSidebarMenu from '@/components/sidebar/MSsidebar-menu.vue'

export default {
    data (){
        return{
    }
    },
    components:{
        MsSidebarHeader,
        MsSidebarMenu
    },
}
</script>

<style>
   @import url('../../assets/css/component/sidebar.css');
   @import url('../../assets/css/component/icon.css');
</style>