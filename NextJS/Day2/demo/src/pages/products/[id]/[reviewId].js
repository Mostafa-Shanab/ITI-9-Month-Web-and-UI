import { useRouter } from 'next/router';
import React from 'react';

const ReviewID = () => {
    const router = useRouter()
    const {id,reviewId} = router.query
    return (
        <div>
            <h1>the product id is:{id}</h1>
            <h1>the product review id is:{reviewId}</h1>
        </div>
    );
};

export default ReviewID;