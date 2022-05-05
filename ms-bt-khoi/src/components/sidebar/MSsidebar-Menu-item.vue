<template>
    <router-link :to="item.link"
    exactActiveClass ='active'>
        <div class="m-sidebar-item">
            <!-- <div v-if="exactActiveClass == 'active'">a</div> -->
            <div class="m-sidebar-item-icon" v-bind:class="item.icon"></div>
            <div class="m-sidebar-item-content">{{ item.content }}</div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
    },
    methods:{
    
    }
};
</script>

<style>

</style>
