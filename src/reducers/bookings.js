const bookingsDefault = []

export default ( state = bookingsDefault, action ) => {

    switch( action.type ){

        case "SET_BOOKINGS" : {

            return action.bookings;

        }

        case "REMOVE_BOOKING" : {

            return state.filter( ( { id } ) => id !== action.bookingId );
            
        }
        
        default:
        return state;
    }   
       
};