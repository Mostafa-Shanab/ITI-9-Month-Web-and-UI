<template>
    <div>
<h1>Child Inject</h1>
<SubChild/>
    </div>
</template>

<script>
import SubChild from './SubChild.vue';
    export default {
        name:"ChildInject",
        components:{SubChild}
    }
</script>

<style scoped>

</style>