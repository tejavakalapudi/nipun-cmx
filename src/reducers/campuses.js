const campusesDefault = []

export default ( state = campusesDefault, action ) => {

    switch( action.type ){

        case "SET_CAMPUSES" : {
            return action.campuses;
        }
        
        default:
        return state;
    }   
       
};