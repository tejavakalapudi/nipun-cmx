import React from 'react';
import LoaderIcon from "../../public/images/loader.svg";

const LoadingPage = ( props ) => ( 

    <div className="loader" style={{ height: props.height || "" , width: props.width || "" }}>
        <img className="loader__image" src= { LoaderIcon } />
    </div>
        
);

export default LoadingPage;