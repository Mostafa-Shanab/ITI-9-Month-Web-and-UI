import React, { useEffect } from 'react';
import { useParams } from 'react-router';

const UserDetails = () => {

  let {id} = useParams();

  // useEffect(()=>{
  //   fetch(`https://jsonplaceholder.typicode.com/users/2`)
  //   .then(res=>res.json())
  //   .then(data=> console.log(data))
  // },[])
  return (
    <div>
      <h1 className='alert alert-dark w-50 mx-auto my-5 text-center'>User Details Page</h1>
      <h2>User id = <span className='text-danger'>{id}</span></h2>
    </div>
  );
}

export default UserDetails;

