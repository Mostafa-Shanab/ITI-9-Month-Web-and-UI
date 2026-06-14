import React from 'react';

const Quotes = (props) => {
    console.log(props);
    const {quotes} = props
    return (
        <div>
            <h1>Quotes Components</h1>
            {
                quotes.map((q)=>{
                    return(
                        <div key={q.id}>
                            <h1>{q.quote}</h1>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Quotes;