<template>
  <button :id="buttonData.TypeOfButton_ID" :class="buttonData.TypeOfButton_Class">{{buttonData.content}}</button>
</template>

<script>
export default {
  props:{
      buttonData:Object,
      btn:Object
  }
}
</script>

<style>
@import '../../assets/css/component/button.css';
</style>