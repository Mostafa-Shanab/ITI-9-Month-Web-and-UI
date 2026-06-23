<template>
    <div>
   <h2>Child Props</h2>
   <h3>Static : {{ staticData }}</h3>
   <h3>dynamic :{{ dynamic }}</h3>
   name : <input type="text" v-model="name">
   {{ name }}
   <button @click="$emit('send',name)">Send name to parent</button>
    </div>
</template>

<script>
    export default {
        name:"ChildProps",
        props:['staticData','dynamic'],
        // emits:['send'],
        data(){
            return{
                name:''
            }
        }
    }
</script>

<style scoped>

</style>