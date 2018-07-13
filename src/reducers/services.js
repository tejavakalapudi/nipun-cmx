const defaultServices = {
    loginStatus : "",
    sessionToken : "",
    campuses : [],
    buildings : [],
    floors : [],
    zones : []
};

const buildingArray = [];

export default ( state = defaultServices, action ) => {
    switch( action.type ){

        case "LOGIN_RESPONSE" : {
            return { ...state, loginStatus : action.response.loginStatus, sessionToken : action.response.sessionToken } 
        }

        case "CAMPUS_RESPONSE" : {
            return { ...state, campuses : action.campusList } 
        }

        case "BUILDING_RESPONSE" : {

            return { ...state, buildings : action.buildingList } 
            //console.log(".....", [ ...buildingArray, ...action.buildingList ]);
            //return [ ...state.buildings, ...action.buildingList ]
        }

        case "FLOOR_RESPONSE" : {

            return { ...state, floors : action.floorList }
            
        }

        default:
        return state;
    }      
};