import { Component } from "react";

class Task  extends Component{

  constructor(){
    super()

    // this.state = {
    //   task:'Angular'
    // }
  }


  state = {
    taskList: [
      {id:1,task:'React.js'},
      {id:2, task:'monogo db'}
    ]
  }


  render(){
    return(
      <>
        <h2>Hello from task component</h2>
        <h3>your task is: {this.state.taskList[0].task}</h3>
      </>
    )
  }


}

export default Task;