<template>
    <div>
<h1>Parent Props</h1>
<ChildProps staticData="staticdata" :dynamic="dynamicData" @send="handleSend"/>
    </div>
</template>

<script>
import ChildProps from './Child.vue';
    export default {
        name:'ParentProps',
        components:{
            ChildProps
        },
        data(){
            return{
                dynamicData:"dynamicData"
            }
        },methods:{
            handleSend(data){
                alert("name from child " + data)
            }
        }
    }
</script>

<style scoped>

</style>