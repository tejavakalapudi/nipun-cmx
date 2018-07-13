import AxiosInstance from "../cmxApi/axiosInstance";

const setMyBookings = ( bookings = [] ) => ({

    type : "SET_BOOKINGS",
    bookings

});

export const getMyBookings = ( token ) => {
    
    return( dispatch ) => {

        AxiosInstance.get( "ws/desk/myBookings",{
            headers:{
                token : token
            }
        })
        .then( res => {
    
            console.log( "Response about active bookings", res.data.msg );
            setMyBookings( res.data.msg );
    
        })
        .catch( error => {
    
            console.log( "Something went wrong while getting an information about active bookings - ", error );
    
        });
        
    }

}