import AxiosInstance from "../cmxApi/axiosInstance";

let floorList = [];

const setDesks = ( desks = [] ) => ({

    type : "SET_DESKS",
    desks

});

export const setReqStatus = ( status ) => ({

    type : "SET_STATUS",
    status

});

export const getAvailableDesks = ({ token, campusId, buildingId, floorId, fromTime, toTime }) => {

    let desksByBuildings = {};

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

            //send status to store and check for that value in check availability modal

            dispatch( setDesks(

                res.data.msg.checkAvailability.filter( desk =>  desk.status === "Available" )

            ) );

            dispatch( setReqStatus( true ) );
    
        })
        .catch( error => {
    
            console.log( "Something went wrong while getting information about available desks", error );

            dispatch( setReqStatus( false ) );
    
        });
        
    }

}