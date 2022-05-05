<template>
    <div class="form-group">
        <label 
        v-show="inputItem.label.show"
        for="">{{inputItem.label.title}} <i v-show="inputItem.label.required">*</i></label>
        <input
            :type="inputItem.input.type"
            :name="inputItem.input.name"
            :class="inputItem.input.class"
            :style="inputItem.input.css"
            @blur="handleBlur"
            @focus="focus"
            :value="employeeprop"
            :ref="inputItem.input.ref"
        />
        <span class="form-message"></span>
    </div>
</template>

<script>
export default {
   props:{
      inputItem:Object,
      employeeprop:String,
   },
    mounted() {
        /**
         * foucus vào input employee code khi mở form
         */
        // this.$nextTick(() => this.$refs.focusMe.focus());
    },
   methods:{
       /**
        * Xứ lý sự kiện khi blur input gọi sang hàm handle của component detail
        * created by cuongnd1
        * created date 28/2/2022
        */
       handleBlur(){
           var value = event.currentTarget.value;
           this.$emit('handleBlur',this.inputItem.input.model,value);
       },
       /**
        * gọi sang hàm focus của component cha
        * created by cuongnd1
        * created date 28/2/2022
        */
       focus(){
           this.$emit('focus');
       }
   },
   data(){
        return {
          
        }
   }
};
</script>

<style>
</style>
