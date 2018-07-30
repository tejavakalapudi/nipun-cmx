const filtersDefault = {
    building : "",
    floor : "",
    zone : ""
};

export default ( state = filtersDefault, action ) => {
    switch( action.type ){

        case "BUILDING_FILTER" : {

            return { ...state, building : action.building }

        }

        case "FLOOR_FILTER" : {

            return { ...state, floor : action.floor }
            
        }

        case "ZONE_FILTER" : {

            return { ...state, zone : action.zone }
            
        }

        default:
        return state;
    }     
};