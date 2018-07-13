import AxiosInstance from "../cmxApi/axiosInstance";

let floorList = [];

const setDesks = ( desks = [] ) => ({

    type : "SET_DESKS",
    desks

});

export const getAvailableDesks = ({ token, campusId, buildingId, floorId }) => {
    
    console.log("Ravi", token, campusId, buildingId, floorId);
    return( dispatch ) => {

        AxiosInstance.get( "ws/desk/checkAvailability",{
            headers:{
                token : token,
                campusId : campusId,
                buildingId : buildingId,
                floorId : floorId 
            }
        })
        .then( res => {
    
            console.log( "Response about available desks", res );

            /*const floorsByBuildingId = res.data.map( ( floor ) => {
    
                return{
                    floorName : floor.floorName,
                    floorId : floor.id,
                    buildingId : buildingId
                }
                
            });

            floorList = [ ...floorList, ...floorsByBuildingId ];
            
            dispatch( setFloors( floorList ) );*/
    
        })
        .catch( error => {
    
            console.log( "Something went wrong while getting information about available desks", error );
    
        });
        
    }

}
