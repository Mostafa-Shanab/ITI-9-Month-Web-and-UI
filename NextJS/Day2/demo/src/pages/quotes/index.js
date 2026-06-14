import Quotes from '@/components/Quotes';
import React from 'react';

const index = ({quotes}) => {
    return (
        <div>
            <Quotes {...quotes}/>
        </div>
    );
};

export default index;
export async function getServerSideProps(){
    const res = await fetch("https://dummyjson.com/quotes")
    const data = await res.json()
    return{
        props:{
            quotes:data
        }
    }
}