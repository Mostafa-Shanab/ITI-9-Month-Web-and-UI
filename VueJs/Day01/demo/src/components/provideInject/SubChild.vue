<template>
    <div>
<h1>SubChild</h1>
<h2>{{ name }}</h2>
<h2>{{ completeName }}</h2>
    </div>
</template>

<script>
    export default {
        name:"SubChild",
        inject:['name','completeName']
    }
</script>

<style scoped>

</style>