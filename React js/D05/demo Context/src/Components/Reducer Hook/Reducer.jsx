import { act, useReducer, useState } from "react";


function reducer(state, action) {
  console.log('state', state);
  console.log('action', action);

  // if(action.type == 'incr') return state + action.payload
  // if(action.type == 'decr') return state - action.payload
  // if(action.type == 'reset') return 0
  // if(action.type == 'set') return Number(action.payload)

  switch(action.type){
    case 'incr': return {...state, counter: state.counter + state.step};
    case 'decr': return {...state, counter: state.counter - state.step};
    case 'reset': return {...state, counter: 0};
    case 'set': return {...state, counter:Number(action.payload)};
    case 'setStep': return {...state, step: action.payload};
    default : return state ;
  }

}


const Reducer = () => {
  let [state, dispatch] = useReducer(reducer,{counter:0, step:1})

  const handleChanage = (e)=> {
    dispatch({type:'set', payload:e.target.value})
  }
  const handleIncr = ()=> {
    dispatch({type:'incr'})
  }
  const handleDecr = ()=> {
    dispatch({type:'decr'})
  }
  const handleReset = ()=> {
    dispatch({type:'reset'})
  }

  const handleSteps = (s) => {
    dispatch({type:'setStep', payload: s})
  }

  return (
    <>
      <div className="w-50 mx-auto text-center my-5">

        <button onClick={()=> handleSteps(2)}>+2</button>
        <button onClick={()=> handleSteps(4)}>+4</button>
        <button onClick={()=> handleSteps(6)}>+6</button>

        <div className="input-group">
          <button onClick={handleDecr} className="btn btn-warning">-</button>
          <input type="number"  className="form-control text-center fs-5 fw-bold" value={state.counter} onChange={handleChanage}/>
          <button onClick={handleIncr} className="btn btn-primary">+</button>
        </div>

        <button onClick={handleReset} className="btn btn-success my-5">Reset</button>
      </div>
    </>
  );
}

export default Reducer;
