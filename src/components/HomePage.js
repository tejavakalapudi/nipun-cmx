import React from "react";
import { 
    Container, 
    Jumbotron,
    Row, 
    Col,
    Nav,
    NavItem,
    Navbar,
    Button,
    Input 
} from "reactstrap";
import { NavLink } from "react-router-dom"; 
import { connect } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import LanderPage from  "./LanderPage";
import DeskBooking from "./DeskBooking";

//https://gist.github.com/benjaminfisher/2757473

class HomePage extends React.Component {

    render(){
        return (
            <div>
                <ScrollToTop />
                <LanderPage push = {this.props.history.push}/>
            </div>
        );
    }
}; 

export default connect()( HomePage );