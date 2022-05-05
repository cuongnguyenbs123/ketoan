<template>
  <div class="m-sidebar-menu sidebar">
     <ms-sidebar-menu-item 
     v-for="item in SideBarMenu"
     v-bind:key="item.index"
     v-bind:item="item"
     />
  </div>
</template>

<script>
import MsSidebarMenuItem from '@/components/sidebar/MSsidebar-Menu-item.vue'
export default {
  components:{
      MsSidebarMenuItem
  },
  computed:{
    SideBarMenu(){
      return this.$store.state.listSidebarItem
    }
  }
}
</script>

<style>

</style>