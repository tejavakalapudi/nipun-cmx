import React from 'react';

const LoadingPage = ( props ) => ( 

    <div className="loader" style={{ height: props.height || "" , width: props.width || "" }}>
        <img className="loader__image" src= "/images/loader.gif" />
    </div>
        
);

export default LoadingPage;