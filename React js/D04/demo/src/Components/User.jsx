// import '/node_modules/bootstrap/dist/css/bootstrap.min.css'

import { memo } from 'react'
import userStyle from '../Styles/User.module.css'


function User({id=1, name='moaz' ,age=22, children, incrAgeFun, decrAgeFun, deletUserFun}){
// function User(props){

  // console.log(props);
  // const {id, name ,age} = props

  function handleIncrBtn (e) {
    // console.log(e);
    // console.log(age);
    // age++
    incrAgeFun(id)
    // console.log(age);

  }

  const handelDecrBtn = ()=>{
    decrAgeFun(id)
  }
  const handleDelete = ()=>{
    deletUserFun(id)
  }

  return(
    <>
      <div style={{backgroundColor:'dodgerblue', color:'white', fontSize:'17px', width:'70%', margin:'10px auto', textAlign:'center', padding:'10px', borderRadius:'8px'}}>
        <div className="alert alert-success">Id: {id}</div>
        <div>Name:{name}</div>
        <div>Age:{age}</div>

        <h1 id='h1Id'>User Component</h1>
        {/* <div>
          {children}
        </div> */}
        {/* <button onClick={()=> handleIncrBtn(this)} style={Styles.btnStyle}>Incr</button> */}
        <button onClick={handleIncrBtn} style={Styles.btnStyle}>Incr</button>
        <button onClick={handelDecrBtn} style={{...Styles.btnStyle, backgroundColor:'yellowgreen'}}>Decr</button>
        {/* <button onClick={handleDelete} style={{...Styles.btnStyle, backgroundColor:'crimson'}}>Delete</button> */}
        <button onClick={handleDelete} className={userStyle.button1}>Delete</button>
      </div>
    </>
  )
}


export default memo(User);


let Styles = {
  btnStyle:{border:"none", backgroundColor:"orange", color:"white", padding:"10px 15px", borderRadius:"10px", margin:"10px", fontSize:"18px", cursor:"pointer" }
}