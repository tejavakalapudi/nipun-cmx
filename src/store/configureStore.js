import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import servicesReducer from "../reducers/services";
import authReducer from "../reducers/auth";
import bookingsReducer from "../reducers/bookings";
import campusesReducer from "../reducers/campuses";
import buildingsReducer from "../reducers/buildings";
import floorsReducer from "../reducers/floors";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default() => {

    const store = createStore( 
        combineReducers({
            auth : authReducer,
            services : servicesReducer,
            myBookings : bookingsReducer,
            campuses : campusesReducer,
            buildings : buildingsReducer,
            floors : floorsReducer
        }),
        composeEnhancers( applyMiddleware( thunk ))
    );
    
    return store;
};