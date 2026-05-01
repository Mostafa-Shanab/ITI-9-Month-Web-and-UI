function User({id=1, name='moaz' ,age=22, children}){
// function User(props){

  // console.log(props);
  // const {id, name ,age} = props

  return(
    <>
      <div style={{backgroundColor:'dodgerblue', color:'white', fontSize:'17px', width:'70%', margin:'10px auto', textAlign:'center', padding:'10px', borderRadius:'8px'}}>
        <div>Id: {id}</div>
        <div>Name:{name}</div>
        <div>Age:{age}</div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}


export default User;