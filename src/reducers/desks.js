const desksDefault = []

export default ( state = desksDefault, action ) => {

    switch( action.type ){

        case "SET_DESKS" : {
            return action.desks;
        }
        
        default:
        return state;
    }   
       
};