import React from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { useNavigate } from 'react-router';

const NotFound = () => {

  let navigateTo = useNavigate()

  const handleClick = ()=>{
    navigateTo('/home')
  }

  return (
    <div className='text-center'>
      <h1 className='alert alert-danger w-50 mx-auto my-5 text-center'>OOps Error 404 page notfound</h1>
      <button onClick={handleClick} className='btn btn-outline-dark'><IoHome/> <FaArrowAltCircleLeft/></button>
    </div> 
  );
}

export default NotFound;
