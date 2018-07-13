import React from "react";
import { connect } from "react-redux";
import { Row, Container, Col, Button } from "reactstrap";
import TCSLogo from "../../public/images/TATA_Consultancy_Services_Logo_blue.png";
import DeskBookingLogo from "../../public/images/201559.svg";
import RoomBookingLogo from "../../public/images/648287.svg";
import TicketsLogo from "../../public/images/1003902.svg";
import { startServiceLogin } from "../actions/services";
import Coverflow from "react-coverflow";

class LanderPage extends React.Component {

    state = {
        minHeight : window.innerHeight,
        minWidth : window.innerWidth,
        previousIndex : 0,
        activeIndex : 1,
        nextIndex : 2,
    }

    counter = 1;

    slideNext = () => {
        
        this.setState({
            previousIndex : this.counter
        });
        // then increment and reset regularly
        this.counter += 1;
        if ( this.counter > 2 ) {

            this.counter = 0;

        }

        this.setState({
            activeIndex : this.counter
        });
      
    }

    slidePrevious = () => {

        // then decrement and reset regularly
        this.counter -= 1;
        if ( this.counter < 0 ) {
            this.counter = 2;
        }

        this.setState({
            activeIndex : this.counter,
            previousIndex : this.counter === 0 ? 2 : this.counter - 1
        });
      
    }

    onDeskBookingClick = () => {
        this.props.push( "/deskbooking" );
    }

    resizeLanderPage = () =>{

        const landerDiv = document.getElementById( "landerDiv" );

        if ( landerDiv ){
            this.setState( {
                minHeight: window.innerHeight,
                minWidth : window.innerWidth
            });     
        }

    }

    render(){

        window.addEventListener( 'resize', this.resizeLanderPage );
        
        return (
            <div id="landerDiv" className = "lander__container" style={{ minHeight: this.state.minHeight }}>

                <Container>
                    <Row className="justify-content-center">
                        <img src={TCSLogo} className="lander__image"/>

                        <Coverflow
                            width={this.state.minWidth}
                            height={this.state.minHeight - 200}
                            displayQuantityOfSide={2}
                            navigation={true}
                            enableHeading={false}
                            active={1}
                        >
                            <div
                                onClick={(e) => {console.log("Clicked first div")}}
                                onKeyDown={(e) => { console.log("keydown first div") }}
                                role="menuitem"
                                tabIndex="0"
                            >   
                                <Container className="lander__room-booking thumbnail__container">
                                    <Row className="justify-content-center">
                                        <img src={RoomBookingLogo} alt='Action one' className="lander__action-icon"/>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col xs="11" className="lander__action-iconText text__align-center">
                                            Conference Room Booking
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                            <div
                                onClick={ this.onDeskBookingClick }
                                onKeyDown={ ( e ) => { console.log("keydown second div") }}
                                role="menuitem"
                                tabIndex="0"
                            >  
                                <Container className="lander__desk-booking thumbnail__container">
                                    <Row className="justify-content-center">
                                        <img src={DeskBookingLogo} alt='Action two' className="lander__action-icon"/>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col xs="11" className="lander__action-iconText text__align-center">
                                            Desk Booking
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                            <div
                                onClick={(e) => {console.log("Clicked third div")}}
                                onKeyDown={(e) => {console.log("keydown third div")}}
                                role="menuitem"
                                tabIndex="0"
                            >
                                <Container className="lander__tickets thumbnail__container">
                                    <Row className="justify-content-center">
                                        <img src={TicketsLogo} alt='Action three' className="lander__action-icon"/>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col xs="11" className="lander__action-iconText text__align-center">
                                            Tickets
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Coverflow>
                    </Row>
                </Container>

            </div>
        );
    }
}; 


const mapStateToProps = ( store ) => {

    return {
        services : store.services
    }

}

export default connect( mapStateToProps )( LanderPage );