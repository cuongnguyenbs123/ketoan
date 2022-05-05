<template>
    <div class="m-page-header">
        <div class="m-page-header-left">
            <ms-button v-bind:buttonData="buttonData[0]" />
            <ms-selectbox v-bind:selectboxData="selectboxData[0]" />
        </div>
        <div class="m-page-header-right">
            <ms-button v-bind:buttonData="buttonData[1]" />
            <div id="m-default-avatar"></div>
            <ms-selectbox v-bind:selectboxData="selectboxData[1]" />
        </div>
    </div>
</template>

<script>
import MsSelectbox from "../combobox/MSSelectbox.vue";
import MsButton from "../button/MSButton.vue";
export default {
    components: {
        MsSelectbox,
        MsButton,
    },
    data() {
        return {
            selectboxData: [
                {
                    content: "Công ty cổ phần MISA",
                    TypeOfButton: "m-select-box-button",
                },
                {
                    content: "Nguyễn Đại Cương",
                    TypeOfButton: "m-select-box-button",
                },
            ],
            buttonData: [
                {
                    content: "",
                    TypeOfButton_ID: "m-btn-menu",
                    TypeOfButton_Class: "",
                },
                {
                    content: "",
                    TypeOfButton_ID: "m-btn-notification",
                    TypeOfButton_Class: "",
                },
            ],
        };
    },
    methods: {
        
    },
};
</script>

<style>
@import url("../../assets/css/component/header.css");
@import url("../../assets/css/component/button.css");
@import url("../../assets/css/component/selectbox.css");
</style>
