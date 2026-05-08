
const Search = ({searchDataFun}) => {

  const handleChg = (e)=> {
    // console.log(e.target.value);
    searchDataFun(e.target.value)
  }

  return (
    <>
      <div style={Styles.divStyle}>
        <input style={Styles.inputStyle} type="text" placeholder="Search" onChange={handleChg}/>
      </div>
    </>
  );
}

export default Search;


let Styles = {
  divStyle: {width:"40%", margin:"20px auto", display:"flex", flexDirection:"column", border:"2px solid crimson", padding:"20px", borderRadius:"5px"},
  inputStyle: {width:"70%", margin:"5px auto", outline:"none", border:"2px solid cornflowerblue", padding:"10px", borderRadius:"5px"},
} 
