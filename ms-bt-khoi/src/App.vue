<template>
    <div id="app">
        <div class="m-container-employee-list">
            <ms-sidebar />
            <div class="m-page">
                <ms-header/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import MsSidebar from "./components/layout/MSsidebar.vue";
import MsHeader from "./components/layout/MSheader.vue";

// import MSbody from './components/layout/MSbody.vue'
export default {
    components: {
        MsSidebar,
        MsHeader,
       
    },
};
</script>
<style>
@import url("./assets/css/main.css");
@import url("./assets/fonts/fontawesome-5.15.1/css/all.min.css");
@font-face {
    font-family: notosans;
    src: url("./assets/fonts/notosans-regular.2cb88a13.woff2");
}

</style>
