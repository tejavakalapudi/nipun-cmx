import { database, storageRef } from "../firebase/firebase";

export const addTravelPage = ( travel ) => ({
    type : "ADD_TRAVEL",
    travel
});

export const startAddTravelPage  = ( travelData = {} ) => {
    
    return ( dispatch ) => {
        const {
            id = "",
            name = "",
            description = ""
        } = travelData;

        return database.ref( "webinfo/travelDiaries" ).push( travelData ).then( (ref) => {

            dispatch( addTravelPage({
                id : ref.key,
                ...travelData
            }));

        })
        .catch( ( error ) => {

            console.log( "Add Travel failed: " + error.message );

        });

    }
};


export const setTravelPages = ( travelPages = [] ) => ({
    type : "SET_TRAVEL_PAGES",
    travelPages    
});

export const startSetTravelPages = () => {
    
    return( dispatch ) => {

        return database.ref( "webinfo/travelDiaries" ).once( "value")

            .then(( snapshot ) => {

                    const travelPages = [];
            
                    snapshot.forEach(( travel ) => {
            
                        travelPages.push({
                            id : travel.key,
                            ...travel.val()
                        })
            
                    })
            
                    dispatch( setTravelPages( travelPages ) );
            
                }
            )
            .catch( ( e ) => {
                
                console.log( "Fetching travel diaries data has failed with error ", e );
                
            });
    };

};