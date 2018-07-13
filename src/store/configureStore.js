import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import bookingsReducer from "../reducers/bookings";
import campusesReducer from "../reducers/campuses";
import buildingsReducer from "../reducers/buildings";
import floorsReducer from "../reducers/floors";
import desksReducer from "../reducers/desks";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default() => {

    const store = createStore( 
        combineReducers({
            auth : authReducer,
            myBookings : bookingsReducer,
            campuses : campusesReducer,
            buildings : buildingsReducer,
            floors : floorsReducer,
            availableDesks : desksReducer
        }),
        composeEnhancers( applyMiddleware( thunk ))
    );
    
    return store;
};