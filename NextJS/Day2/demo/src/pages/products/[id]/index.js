import { useRouter } from 'next/router';
import React from 'react';

const ID = () => {
    const router = useRouter()
    const {id} =router.query
    return (
        <div>
            <h1>the product id is :{id}</h1>
        </div>
    );
};

export default ID;