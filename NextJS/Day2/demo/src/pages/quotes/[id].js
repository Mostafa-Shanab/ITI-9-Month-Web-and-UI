import React from 'react';

const ID = ({quote}) => {
    console.log(quote);
    return (
        <div>
            <h1>Quote Details</h1>
        </div>
    );
};

export default ID;
export async function getServerSideProps(context) {
    const {params} = context;
    const res = await fetch(`https://dummyjson.com/quotes/${params.id}`)
    const data = await res.json()
    return{
        props:{
            quote:data
        }
    }
    
}