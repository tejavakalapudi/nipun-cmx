import React from "react";

//https://reacttraining.com/react-router/web/guides/philosophy
import { Route, Switch, withRouter } from "react-router-dom"; 

import HomePage from "../components/HomePage";
import NotFound from "../components/NotFoundPage";
import AdminPage from "../components/AdminPage";
import DeskBooking from "../components/DeskBooking";

class SwitchComponent extends React.Component {

    state = {
        routeChanged : false
    }

    componentWillMount() {
        this.routeChange = this.props.history.listen((location, action) => {
            this.setState({
                routeChanged : true
            });
        });
    }

    componentWillUnmount() {
        this.routeChange();
    }
    
    render(){

        return(
            <div id = "bodyDiv">
                <Switch>
                    <Route path = "/" component = { HomePage } exact={true}/>
                    <Route path = "/home" component = { HomePage }/>
                    <Route path = "/deskbooking" component = { DeskBooking } />
                    <Route component = { NotFound } />
                </Switch>
            </div>
        );
    }
}

export default withRouter( SwitchComponent );
