<template>
    <div class="form-group">
        <label 
        v-show="inputItem.label.show"
        for="">{{inputItem.label.title}}</label>
        <input
            type="date"
            :name="inputItem.input.name"
            :class="inputItem.input.class"
            :style="inputItem.input.css"
            @blur="handleBlur"
            @focus="focus"
            :value="format"
            :ref="inputItem.input.ref"
        />
        <span class="form-message"></span>
    </div>
</template>

<script>
import moment from 'moment'
export default {
   props:{
      inputItem:Object,
      employeeprop:String,
   },
   computed:{
         format() {
             if(!this.employeeprop) return ""
             else
        return moment(this.employeeprop).format('YYYY-MM-DD')
       },
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
   }
};
</script>

<style>
</style>
