const desksDefault = {
    availableDesks : [],
    requestSuccess : ""
}

export default ( state = desksDefault, action ) => {

    switch( action.type ){

        case "SET_DESKS" : {
            return { ...state, availableDesks : action.desks };
        }
        
        case "SET_STATUS" : {
            return { ...state, requestSuccess : action.status };
        }
        
        default:
        return state;
    }   
       
};