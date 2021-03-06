const authDefault = {
    loginStatus : "",
    sessionToken : ""
};

export default ( state = authDefault, action ) => {

    switch( action.type ){

        case "LOGIN_RESPONSE" : {
            return { ...state, loginStatus : action.response.loginStatus, sessionToken : action.response.sessionToken }; 
        }

        case "RESET_AUTH" : {
            return authDefault;
        }
        
        default:
        return state;
    }   
       
};