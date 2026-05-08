import { useState } from "react";

import classes from '../Styles/AddUser.module.css'
import UseCounter from "../Hooks/useCounter";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguageFun } from "../Redux/slices/languageS";
import { decrementCounter, incrementCounter } from "../Redux/slices/counterS";
import { addNewUser } from "../Redux/slices/usersDataS";
import { useNavigate } from "react-router";

const AddUser = () => {

  const [inputData, setInputData] = useState({name:'',age:''});

  let navigateTo = useNavigate();

  const handleChg = (e)=> {
    setInputData({...inputData, [e.target.name]:e.target.value})
  }

  const handelSubmit = (e)=>{
    e.preventDefault()
    dispatch(addNewUser(inputData))
    setInputData({name:'', age:''})
    navigateTo('/users')
  }

  // let {t, i18n}  = useTranslation('form');
  let {t, i18n}  = useTranslation();

  console.log(i18n.language);


  let lang = useSelector((state)=> state.languageR.language);

  let dispatch = useDispatch();

  let counter = useSelector((state)=>state.counterR.counter)


  return (
    <>
     <div dir={lang === 'en'? 'ltr':'rtl'}>
      {i18n.language === 'en' && <button onClick={()=> {i18n.changeLanguage('ar'); dispatch(changeLanguageFun('ع'))}} className="btn btn-danger mx-5 fs-5 fw-bold">Ar <GrLanguage/></button>}
      {i18n.language === 'ar' && <button onClick={()=> {i18n.changeLanguage('en'); ; dispatch(changeLanguageFun('en'))}} className="btn btn-warning mx-5 fs-5 fw-bold">En <GrLanguage/></button>}
      
      <h1>{lang}</h1>
      <form style={Styles.formStyle} onSubmit={handelSubmit}>
        <div className="w-75 mx-auto">
          <label className="fs-5 fw-bold mx-3">{t("Name")}</label>
          <input style={Styles.inputStyle} type="text" placeholder={t(`userName`, name)} name="name" value={inputData.name} onChange={handleChg}/>
        </div>
        <div className="w-75 mx-auto">
          <label className="fs-5 fw-bold mx-3">{t("Age")}</label>
          <input style={Styles.inputStyle} type="text" placeholder={t("userAge")} name="age" value={inputData.age} onChange={handleChg}/>
        </div>
        <input className={classes.button1} type="submit" value={t("Add")}/>
      </form>
     </div>

     <div className="w-50 mx-auto text-center">
        <button onClick={()=> dispatch(decrementCounter(5))} className="btn btn-primary mx-3">decr</button>
        <span className="fs-5 fw-bold">{counter}</span>
        <button onClick={()=> dispatch(incrementCounter())} className="btn btn-warning mx-3">incr</button>
     </div>
    </>
  );
}

export default AddUser;


let Styles = {
  formStyle: {width:"50%", margin:"20px auto", display:"flex", flexDirection:"column", border:"2px solid crimson", padding:"20px", borderRadius:"5px"},
  inputStyle: {width:"70%", margin:"5px auto", outline:"none", border:"2px solid cornflowerblue", padding:"10px", borderRadius:"5px"},
  btnStyl: {width:"30%", margin:"5px auto", border:"none", backgroundColor:'crimson', fontSize:"17px", color:"white", padding:"10px 15px", borderRadius:"8px"}
} 