import AxiosInstance from "../cmxApi/axiosInstance";
import { getFloors } from "./floors";

let buildingList = [];

const setBuildings = ( buildings = [] ) => ({

    type : "SET_BUILDINGS",
    buildings

});

export const getBuildings = ( token, campusId ) => {
    
    return( dispatch ) => {

        AxiosInstance.get( "buildingRest/getByCampusId",{
            headers:{
                token : token 
            },
            params:{
                campusId : campusId
            }
        })
        .then( res => {
    
            console.log( "Response about buildings", res );

            const buildingsByCampusId = res.data.map( ( building ) => {

                dispatch( getFloors( token, building.id ) );
    
                return{
                    buildingName : building.buildingName,
                    buildingId : building.id,
                    campusId : campusId
                }
                
            });

            buildingList = [ ...buildingList, ...buildingsByCampusId ];
            
            dispatch( setBuildings( buildingList ) );
    
        })
        .catch( error => {
    
            console.log( "Something went wrong while getting information about buildings", error );
    
        });
        
    }

}