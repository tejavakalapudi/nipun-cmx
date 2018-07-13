const buildingsDefault = []

export default ( state = buildingsDefault, action ) => {

    switch( action.type ){

        case "SET_BUILDINGS" : {
            return action.buildings;
        }
        
        default:
        return state;
    }   
       
};