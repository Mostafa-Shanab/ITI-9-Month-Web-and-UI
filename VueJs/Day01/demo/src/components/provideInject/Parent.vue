<template>
    <div>
<h1>Parent Provide</h1>
<Child/>
    </div>
</template>

<script>
import Child from './Child.vue';
    export default {
        name:"ParentProvide",
        components:{
            Child
        },
        // provide:{
        //     name:'omar'
        // }
        provide(){
            return{
               name:"omar",
               completeName:this.fullName
            }
        },
        data(){
            return{
                fullName:"ahmed mhmd"
            }
        }
    }
</script>

<style scoped>

</style>