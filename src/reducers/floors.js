const floorsDefault = []

export default ( state = floorsDefault, action ) => {

    switch( action.type ){

        case "SET_FLOORS" : {
            return action.floors;
        }
        
        default:
        return state;
    }   
       
};