
<template>
    <div class="container">
        <Select></Select>
    </div>
</template>
<script>
import Select from './components/select.vue'
export default {
  name: 'app',
  components: {
    Select
  }
}
</script>
<style lang="less">
    @import "../src/styles/index.less";
</style>
<style lang="less" scoped>
.container {
    padding: 10px 40px 0;
}
</style>
