import axios from "axios";
import {PureComponent } from "react";
import img1 from "../assets/images/img1.jpg"
import img2 from "../assets/images/img2.jpg"


// class Task  extends Component{
class Task  extends PureComponent{

  constructor(props){
    super(props)

    // this.state = {
    //   task:'Angular'
    // }
    console.log('constructor🌄');
  }


  state = {
    task: null
    // task: {name:'javasript', isDone:false}
    // taskList: [
    //   {id:1,task:'React.js'},
    //   {id:2, task:'monogo db'}
    // ]
  }

  componentDidMount(){
    console.log('componentDidMount ☀️');
    // fetch('https://jsonplaceholder.typicode.com/todos/2')
    // .then((res)=> res.json())
    // .then((data)=> this.setState({task:data}))

    axios.get('https://jsonplaceholder.typicode.com/todos/2')
    .then(res => this.setState({task:res.data}))
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate🤔');
    return true
  }

  componentDidUpdate(){
    console.log('componentDidUpdate');
  }



  render(){

    const handelClick = (e)=>{
      // console.log(e);
      console.log(this.state.task.completed);
      // this.state.task.isDone = true
      // this.state.task = {...this.state.task, isDone:true}
      // this.state = {task:{...this.state.task, isDone:true}}

      // this.setState({task:{name:'javasript',isDone:true}})
      this.setState({task:{...this.state.task,completed:true}})
      console.log(this.state.task.completed);
    }

    console.log('render 🔄️🆕');

    if(!this.state.task){ return <p>loooooooooooooding</p>}

    return(
      <>
      <div style={{textAlign:'center'}}>
        <h2 className="alert alert-warning">Hello from task component</h2>
        <h3>your task is: <span style={{backgroundColor:'coral'}}>{this.state.task.title}</span>, {this.state.task.completed?'Done':'InProgress'}</h3>
        <br />
        <button onClick={handelClick}>Done</button>
      </div>

        {/* <h3>your task is: {this.state.taskList[0].task}</h3> */}
        {/* <h4>{this.props.taskName}</h4> */}

        <img src="img.jpg" width={250} alt="" />
        <br /><br />
        <img src={img1} width={250} alt="" />
        <br /><br />
        <img src={img2} width={250} alt="" />
      </>
    )
  }


}

export default Task;