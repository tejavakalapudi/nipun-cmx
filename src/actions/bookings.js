import AxiosInstance from "../cmxApi/axiosInstance";

const setMyBookings = ( bookings = [] ) => ({

    type : "SET_BOOKINGS",
    bookings

});

const removeBooking = ( bookingId ) => ({

    type : "REMOVE_BOOKING",
    bookingId

});

export const getMyBookings = ( token ) => {
    
    return( dispatch ) => {

        AxiosInstance.get( "ws/desk/myBookings",{
            headers:{
                token : token
            }
        })
        .then( res => {
    
            dispatch( setMyBookings( res.data.msg ) );
    
        })
        .catch( error => {
    
            console.error( "Something went wrong while getting an information about active bookings - ", error );
    
        });
        
    }

}

export const addDeskBooking = ( token, deskId, fromTime, toTime ) => {
    
    return( dispatch ) => {

        AxiosInstance.get( "ws/desk/booking",{
            headers:{
                token : token,
                deskId,
                fromTime,
                toTime
            }
        })
        .then( res => {

            if( res.data.msg == "success" ){

                dispatch( getMyBookings( token ) );

            }
    
        })
        .catch( error => {
    
            console.error( "Something went wrong while making desk booking - ", error );
    
        });
        
    }

}

export const removeDeskBooking = ( token, bookingId ) => {
    
    return( dispatch ) => {

        AxiosInstance.get( "ws/desk/cancelBooking ",{
            headers:{
                token,
                bookingId
            }
        })
        .then( res => {

            dispatch( removeBooking( bookingId ) );
    
        })
        .catch( error => {
    
            console.error( "Something went wrong while deleting desk booking - ", error );
    
        });
        
    }

}