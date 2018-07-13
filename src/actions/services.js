import axios from "axios";
import { sha256 } from 'js-sha256';
import uuid from "uuid";

let buildingArray = [];
let floorArray = [];

//SMARTNipun@123GAADI
//http://192.168.15.223:8080/CMX_Nipun_/
//'http://192.168.15.33:8999/CMX_Nipun_/ws/login'

const axiosInstance = axios.create({
    baseURL: 'http://192.168.15.223:8080/CMX_Nipun_/',
    timeout: 5000
});

export const serviceLogin = ( response ) => ({
    type : "LOGIN_RESPONSE",
    response 
});

export const setCampuses = ( campusList ) => ({
    type : "CAMPUS_RESPONSE",
    campusList 
});

export const setBuildings = ( buildingList ) => ({
    type : "BUILDING_RESPONSE",
    buildingList 
});

export const setFloors = ( floorList ) => ({
    type : "FLOOR_RESPONSE",
    floorList 
});

export const concatBuildingArrays = ( buildingList, dispatch ) => {

    buildingArray = [ ...buildingArray, ...buildingList ];

    dispatch( setBuildings( buildingArray ) );

}

export const concatFloorArrays = ( floorList, dispatch ) => {

    floorArray = [ ...floorArray, ...floorList ];

    dispatch( setFloors( floorArray ) );

}

export const getFloors = ( token, buildingId, dispatch ) => {

    axiosInstance.get( "floorRest/getByBuildingId",{
        headers:{
            token : token 
        },
        params:{
            buildingId : buildingId
        }
    })
    .then( res => {

        console.log( "Response about floors", res );

        concatFloorArrays( res.data.map( ( floor ) => {

            return{
                floorName : floor.floorName,
                floorId : floor.id,
                buildingId : buildingId
            }
            
        }), dispatch );

    })
    .catch( error => {

        console.log( "Something went wrong while fetching information about floors", error );

    });

}

export const getBuildings = ( token, campusId, dispatch ) => {

    axiosInstance.get( "buildingRest/getByCampusId",{
        headers:{
            token : token 
        },
        params:{
            campusId : campusId
        }
    })
    .then( res => {

        console.log( "Response about buildings", res );

        concatBuildingArrays( res.data.map( ( building ) => {

            getFloors( token, building.id, dispatch );

            return{
                buildingName : building.buildingName,
                buildingId : building.id,
                campusId : campusId
            }
            
        }), dispatch );

    })
    .catch( error => {

        console.log( "Something went wrong while getting information about buildings", error );

    });

}

export const getCampuses = ( token, dispatch ) => {
    
    axiosInstance.get( "campusRest/getAll",{
        headers:{
            token : token
        }
    })
    .then( res => {

        console.log( "Response about campuses", res );

        dispatch( setCampuses(

            res.data.map( ( campus ) => {

                getBuildings( token, campus.id, dispatch );

                return{
                    campusName : campus.campusName,
                    campusId : campus.id
                }
            })

        ));

    })
    .catch( error => {

        console.log( "Something went wrong while getting information about campuses", error );

    });
}

export const getMyBookings = ( token, dispatch ) => {
    
    axiosInstance.get( "ws/desk/myBookings",{
        headers:{
            token : token
        }
    })
    .then( res => {

        console.log( "Response about active bookings", res );

        /*dispatch( setCampuses(

            res.data.map( ( campus ) => {

                getBuildings( token, campus.id, dispatch );

                return{
                    campusName : campus.campusName,
                    campusID : campus.id
                }
            })

        ));*/

    })
    .catch( error => {

        console.log( "Something went wrong while getting information about active bookings", error );

    });
}

export const startServiceLogin = ( employeeInfo = {} ) => {

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

        axiosInstance.get( "ws/login", authOptions )
        .then( response => {
            
            console.log( "Logged in successfully", response );
    
            dispatch( serviceLogin({
                loginStatus : response.data && response.data.status,
                sessionToken : ( response.data && response.data.msg && response.data.msg.token ) || ""
            }));
            
            getMyBookings( response.data.msg.token, dispatch );
            getCampuses( response.data.msg.token, dispatch );

        })
        .catch( error => {
    
            console.log( "Something went wrong while logging in", error );
    
        });

    }

}