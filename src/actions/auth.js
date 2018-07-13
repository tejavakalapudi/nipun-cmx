import AxiosInstance from "../cmxApi/axiosInstance";
import { getCampuses } from "./campuses";
import { getMyBookings } from "./bookings";
import { sha256 } from 'js-sha256';

const serviceLogin = ( response ) => ({
    type : "LOGIN_RESPONSE",
    response 
});

const startServiceLogin = ( employeeInfo = {} ) => {

    return( dispatch ) => {

        const {
            userName = "",
            password = "",
            employeeId = ""
        } = employeeInfo;

        const authOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'userName' : employeeInfo.userName,
                'password' : sha256( `SMART${employeeInfo.password}GAADI` )
            },
            json: true
        }

        AxiosInstance.get( "ws/login", authOptions )
        .then( response => {
            
            console.log( "Logged in successfully", response );
    
            dispatch( serviceLogin({
                loginStatus : response.data && response.data.status,
                sessionToken : ( response.data && response.data.msg && response.data.msg.token ) || ""
            }));
            
            dispatch( getMyBookings( response.data.msg.token ) );
            dispatch( getCampuses( response.data.msg.token ) );

        })
        .catch( error => {
    
            console.log( "Something went wrong while logging in", error );
    
        });

    }

}

export default startServiceLogin;
