import AxiosInstance from "../cmxApi/axiosInstance";

let floorList = [];

const setDesks = ( desks = [] ) => ({

    type : "SET_DESKS",
    desks

});

export const getAvailableDesks = ({ token, campusId, buildingId, floorId, fromTime, toTime }) => {

    return( dispatch ) => {

        AxiosInstance.get( "ws/desk/checkAvailability",{
            headers:{
                token,
                campusId,
                buildingId,
                floorId,
                zoneId: "",
                deskId: "",
                fromTime,
                toTime
            }
        })
        .then( res => {
    
            console.log( "Response about available desks", res );
            
            dispatch( setDesks( res.data.msg.checkAvailability ) );
    
        })
        .catch( error => {
    
            console.log( "Something went wrong while getting information about available desks", error );
    
        });
        
    }

}
