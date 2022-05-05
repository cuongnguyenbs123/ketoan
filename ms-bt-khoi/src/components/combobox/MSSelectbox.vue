<template>
    <div class="m-select-box">
        <div class="m-select-box-content">{{selectboxData.content}}</div>
        <button :class="selectboxData.TypeOfButton"></button>
    </div>
    
</template>

<script>
export default {
    props:{
        selectboxData:Object
    }
};
</script>

<style>
 @import '../../assets/css/component/selectbox.css';
</style>
