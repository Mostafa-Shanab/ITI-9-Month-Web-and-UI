import React, { useState } from 'react';
import Search from './Search';
import Students from './Students';

const Parent = () => {

  let stdArrData = [
    {id:1, name:"Ahmed"},
    {id:2, name:"Eman"},
    {id:3, name:"alaa"},
    {id:4, name:"mostafa"},
    {id:5, name:"Ibrahim"},
    {id:6, name:"Mahmoud"},
    {id:7, name:"rana"},
    {id:8, name:"Mina"},
    {id:9, name:"omar"},
    {id:10, name:"Nader"},
  ]


  const [studentsData, setStudentsData] = useState(stdArrData);


  const searchDataFun = (sData)=>{
    console.log(sData);

    setStudentsData(stdArrData.filter((std)=> std.name.toLowerCase().includes(sData.toLowerCase())))
  }

  return (
    <>
      <Search searchDataFun={searchDataFun}></Search>
      <Students studentsData={studentsData}></Students>
    </>
  );
}

export default Parent;
