import { useRouter } from 'next/router';
import React from 'react';

const Error = () => {
    const router = useRouter()
    const back=()=>{
        router.replace("/")
    }
    return (
        <div>
            <h1>Oops, Something Wrong</h1>
            <button type="" className='btn btn-dark w-100' onClick={back}>Back To Home</button>
        </div>
    );
};

export default Error;
 Error.getLayout=function(page){
    return <>{page}</>
}