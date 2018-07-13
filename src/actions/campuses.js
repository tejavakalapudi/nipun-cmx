import AxiosInstance from "../cmxApi/axiosInstance";
import { getBuildings } from "./buildings";

const setCampuses = ( campuses = [] ) => ({

    type : "SET_CAMPUSES",
    campuses

});

export const getCampuses = ( token ) => {

    return( dispatch ) => {

        AxiosInstance.get( "campusRest/getAll",{
            headers:{
                token : token
            }
        })
        .then( res => {
    
            console.log( "Response about campuses", res );
    
            dispatch( setCampuses(
    
                res.data.map( ( campus ) => {
    
                    return{
                        campusName : campus.campusName,
                        campusId : campus.id
                    }
                })
    
            ));

            res.data.forEach( campus => {
                dispatch( getBuildings( token, campus.id ) );
            });
    
        })
        .catch( error => {
    
            console.log( "Something went wrong while getting information about conferences", error );
    
        });
        
    }

}
