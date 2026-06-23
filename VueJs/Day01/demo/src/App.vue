<template>
<h1>Vue Course</h1>
<!-- One-Way Binding -->
<h2 v-text="deptName"></h2>
<p v-html="trackName"></p>
<h3>DeptName : {{ deptName }}</h3>
<!-- <h3 v-bind:id="headerId">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam vero modi dolores facilis natus. Corrupti eligendi, quasi quos eos aperiam saepe necessitatibus nostrum praesentium, aspernatur officia perspiciatis. Labore, dolores ducimus.</h3> -->
<h3 :id="headerId">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam vero modi dolores facilis natus. Corrupti eligendi, quasi quos eos aperiam saepe necessitatibus nostrum praesentium, aspernatur officia perspiciatis. Labore, dolores ducimus.</h3>
<h3 :class="headerClass">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam vero modi dolores facilis natus. Corrupti eligendi, quasi quos eos aperiam saepe necessitatibus nostrum praesentium, aspernatur officia perspiciatis. Labore, dolores ducimus.</h3>
<!-- <button v-on:click="flag = !flag">Change Theme</button> -->
<button @click="flag = !flag">Change Theme</button>
<h3 :style="flag?styleOne:styleTwo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam vero modi dolores facilis natus. Corrupti eligendi, quasi quos eos aperiam saepe necessitatibus nostrum praesentium, aspernatur officia perspiciatis. Labore, dolores ducimus.</h3>
<hr>
<h1>Conditions</h1>
<h2>{{ num }}</h2>
<button @click="Inc()">+</button>
<button @click="Dec">-</button>
<div v-if="num===0">zero</div>
<div v-else-if="num>0">positive</div>
<div v-else-if="num<0">negative</div>
<div v-else>NaN</div>
<div v-show="num===0">zero with v-show</div>
<hr>
<h1>Loop</h1>
<h1 v-for="(name,index) in names" :key="index">
  {{index + 1}}-{{ name }}
</h1>

<h1 v-for="(value,key) in myObj" :key="key">
  {{ key }} : {{ value }}
</h1>

<h1 v-for="inf in info" :key="inf.id">
  {{ inf.id }} -- {{ inf.name }}
</h1>
{{ testMethod() }}
{{ testComputed }}
<hr>
<h1>Form</h1>
<h1>{{ JSON.stringify(formValues) }}</h1>
<form action="" @submit.prevent="handleSubmit">
  name : <input type="text" v-model.lazy.trim="formValues.name">
  age : <input type="text" v-model.number.lazy.trim="formValues.age">
  <button>Submit</button>
</form>
<hr>
<ParentProps/>
<hr/>
<ParentProvided/>
</template>

<script>
import ParentProps from './components/props/Parent.vue';
import ParentProvided from './components/provideInject/Parent.vue'
export default {
  name: 'App',
  components:{
    ParentProps,
    ParentProvided
  },
  data(){
    return{
       deptName:"SD",
       trackName:"<h1>UI</h1>",
       headerId:"idstyle",
       headerClass:"classStyle",
       flag:false,
       styleOne:{
        color:"red"
       },
       styleTwo:{
        color:"green"
       },
       num:0,
       names:['ali','omar','menna'],
       myObj:{
        id:1,
        name:"ahmed"
       },
       info :[
        {
          id:1,
          name:'mhmd'
        },{
          id:2,
          name:"alaa"
        }
       ],
       formValues:{
        name:'',
        age:''
       }
    }
  },
  methods:{
    Inc(){
      return ++this.num
    },
    Dec(){
      return --this.num
    },
    testMethod(){
      console.log("method");
    },
    handleSubmit(){
      console.log(this.formValues);
    }
  },
  computed:{
    testComputed(){
      console.log("computed");
      return ""
    }
  },
  watch:{
    num(newValue,oldValue){
      if(newValue > 15 && newValue>oldValue){
        alert("danger")
      }
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#idstyle{
  background-color: aqua;
}
.classStyle{
  background-color: blue;
}
</style>
