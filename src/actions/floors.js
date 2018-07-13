import AxiosInstance from "../cmxApi/axiosInstance";

let floorList = [];

const setFloors = ( floors = [] ) => ({

    type : "SET_FLOORS",
    floors

});

export const getFloors = ( token, buildingId ) => {
    
    return( dispatch ) => {

        AxiosInstance.get( "floorRest/getByBuildingId",{
            headers:{
                token : token 
            },
            params:{
                buildingId : buildingId
            }
        })
        .then( res => {
    
            console.log( "Response about floors", res );

            const floorsByBuildingId = res.data.map( ( floor ) => {
    
                return{
                    floorName : floor.floorName,
                    floorId : floor.id,
                    buildingId : buildingId
                }
                
            });

            floorList = [ ...floorList, ...floorsByBuildingId ];
            
            dispatch( setFloors( floorList ) );
    
        })
        .catch( error => {
    
            console.log( "Something went wrong while getting information about floors", error );
    
        });
        
    }

}
