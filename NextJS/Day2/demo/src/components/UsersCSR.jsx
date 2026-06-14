import React from "react";
import useSWR from "swr";
  const getAllUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    console.log(data)
     return data;
  };
const UsersCSR = () => {
const {data,error} = useSWR('users',getAllUsers)
if(error) return "error..."
if(!data) return "Loading..."
  return <div>
    <h1>Users Component</h1>
    {
        data.map((user)=>{
            return(
                <h1 key={user.id}>{user.firstName}</h1>
            )
        })
    }
  </div>;
};

export default UsersCSR;
