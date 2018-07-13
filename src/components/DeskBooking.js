import React from "react";
import DeskBookingLogo from "../../public/images/201559.svg";
import TCSLogo from "../../public/images/TATA_Consultancy_Services_Logo_white.png";
import { 
    Row, 
    Container, 
    Col, 
    Button, 
    Input, 
    Card, 
    CardImg, 
    Form, 
    FormGroup, 
    FormText, 
    ListGroup, 
    ListGroupItem,
    ListGroupItemHeading, 
    ListGroupItemText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import { FaAt } from "react-icons/lib/fa";
import { MdPerson } from "react-icons/lib/md";
import startServiceLogin from "../actions/auth";
import { getAvailableDesks } from "../actions/desks";
import { connect } from "react-redux";
import LoadingComponent from "./LoadingPage";

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DeskBooking extends React.Component {

    //time format to check availability format("YYYY-MM-DD HH:mm:ss");

    state = {
        minHeight : window.innerHeight,
        employeeId : "",
        employeeEmail : "",
        employeePassword : "",
        showIdSection : false,
        showEmailSection : false,
        contentMinHeight : window.innerHeight - ( 75 + 50 + 60 ),
        makingServiceLogin : false,
        activeBookings : [
            {
                bookingId : "123456",
                deskId : "Nipun-234",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 11, 10:30AM",
                toTime : "June 11, 11:30AM"
            },
            {
                bookingId : "654321",
                deskId : "Nipun-567",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 12, 10:30AM",
                toTime : "June 12, 11:30AM"
            },
            {
                bookingId : "987654",
                deskId : "Nipun-8789",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 13, 10:30AM",
                toTime : "June 13, 11:30AM"
            },
            {
                bookingId : "123456",
                deskId : "Nipun-234",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 11, 10:30AM",
                toTime : "June 11, 11:30AM"
            },
            {
                bookingId : "654321",
                deskId : "Nipun-567",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 12, 10:30AM",
                toTime : "June 12, 11:30AM"
            },
            {
                bookingId : "987654",
                deskId : "Nipun-8789",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 13, 10:30AM",
                toTime : "June 13, 11:30AM"
            },
            {
                bookingId : "123456",
                deskId : "Nipun-234",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 11, 10:30AM",
                toTime : "June 11, 11:30AM"
            },
            {
                bookingId : "654321",
                deskId : "Nipun-567",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 12, 10:30AM",
                toTime : "June 12, 11:30AM"
            },
            {
                bookingId : "987654",
                deskId : "Nipun-8789",
                location : "Ayappa Central",
                bookedBy : "teja",
                fromTime : "June 13, 10:30AM",
                toTime : "June 13, 11:30AM"
            }
        ],
        currentCampus : "Select a campus",
        currentCampusId : "",
        currentBuilding : "Select a floor",
        currentBuildingId : "",
        currentFloor : "Select a floor",
        currentFloorId : "",
        isFormOpen : false,
        fromTime : "",
        toTime : "",
        disableCheckButton : true
    }

    handleEmployeeLogin = ( e ) => {

        e.preventDefault();
        e.persist();

        this.setState({
            employeeId : e.target.value
        });
    }

    handleEmployeeEmail = ( e ) => {

        e.preventDefault();
        e.persist();

        this.setState({
            employeeEmail : e.target.value
        });
    }

    handleEmployeePassword = ( e ) => {

        e.preventDefault();
        e.persist();

        this.setState({
            employeePassword : e.target.value
        });
    }

    showIdSection = () => {

        this.setState({
            showIdSection : true,
            showEmailSection : false
        });

    }

    showEmailSection = () => {

        this.setState({
            showEmailSection : true,
            showIdSection : false
        });

    }

    makeServiceLogin = ( e ) => {

        e.preventDefault();
        e.persist();

        this.props.dispatch( startServiceLogin({
            id : this.state.employeeId,
            userName : this.state.employeeEmail,
            password : this.state.employeePassword
        }));

        this.setState({
            makingServiceLogin : true,
            employeeId : "",
            employeeEmail : "",
            employeePassword : ""
        });

    }

    renderMainContent = () => {

        if( !this.state.makingServiceLogin ){
            return (
                <Row className="justify-content-center deskbooking__login-row">
                    <Col xs="3" onClick={this.showEmailSection} className="text__align-center" >
                        <FaAt size={40} color = {this.state.showEmailSection ? "white" : "#ffc107"}/>
                    </Col>
                    <Col xs="3" onClick={this.showIdSection} className="text__align-center" >
                        <MdPerson size={40} color ={this.state.showIdSection ? "white" : "#ffc107"}/>
                    </Col>
                    {
                        this.state.showIdSection && 
                        <Row className="justify-content-center deskbooking__login-credentials">
                            <Form onSubmit = { this.makeServiceLogin }>
                                <FormGroup>
                                    <FormText className="text__align-center deskbooking__login-text" color="#FBB429">
                                        Employee ID
                                    </FormText>
                                    <Input className="deskbooking__login-input-box text__align-center" type="text" name="employeeId" value = { this.state.employeeId } onChange={ this.handleEmployeeLogin } />
                                </FormGroup>
                                <div className = "justify-content-center">
                                    <FormGroup>
                                        <Col xs="12" className="text__align-center deskbooking__login-enter" >
                                            <Button color="danger" size="lg" >Submit</Button>
                                        </Col>
                                    </FormGroup>
                                </div>
                            </Form>
                        </Row>
                    }
                    {
                        this.state.showEmailSection && 
                        <Row className="justify-content-center deskbooking__login-credentials">
                            <Form onSubmit = { this.makeServiceLogin }>
                                <FormGroup>
                                    <FormText className="text__align-center deskbooking__login-text" color="#FBB429">
                                        User
                                    </FormText>
                                    <Input className="deskbooking__login-input-box text__align-center" type="text" name="employeeId" value = { this.state.employeeEmail } onChange={ this.handleEmployeeEmail } />
                                </FormGroup>
                                <FormGroup>
                                    <FormText className="text__align-center deskbooking__login-text" color="#FBB429">
                                        Password
                                    </FormText>
                                    <Input className="deskbooking__login-input-box text__align-center" type="password" name="employeeId" value = { this.state.employeePassword } onChange={ this.handleEmployeePassword } />
                                </FormGroup>
                                <Container>
                                    <Row className = "justify-content-center">
                                        <FormGroup>
                                            <Col xs="12" className="text__align-center deskbooking__login-enter" >
                                                <Button color="danger" size="lg" >Submit</Button>
                                            </Col>
                                        </FormGroup>
                                    </Row>
                                </Container>
                            </Form> 
                        </Row>
                    }
                </Row>
            )
        }

        if( this.state.makingServiceLogin && this.props.auth && this.props.auth.loginStatus !== "1" && this.props.auth.loginStatus !== "2" ){

            return(
                <LoadingComponent height={ this.state.contentMinHeight } width="100%"/>
            )

        }

        return (
            <Row className="justify-content-center deskbooking__userSession-row">
                <Col xs="12" md="6" className="deskbooking__user-bookings">
                    <ListGroup>
                        <ListGroupItem className="deskbooking__myBookings-title">
                            <ListGroupItemText>
                                My Bookings
                            </ListGroupItemText>
                        </ListGroupItem>
                        {
                            this.state.activeBookings.map( (activeBooking) => {
                                return( 
                                <ListGroupItem>
                                    <ListGroupItemHeading>
                                        Booking ID : {activeBooking.bookingId}
                                    </ListGroupItemHeading>                           
                                    <ListGroupItemText>
                                        {`Desk Id : ${activeBooking.deskId} at ${activeBooking.location}`}
                                    </ListGroupItemText>
                                    <Row className="justify-content-between">
                                        <Col>
                                            <small>
                                                From : {activeBooking.fromTime}
                                            </small>  
                                        </Col>
                                        <Col>
                                            <small>
                                                To : {activeBooking.toTime}
                                            </small>
                                        </Col>
                                    </Row> 
                                </ListGroupItem>
                                )
                            })
                        }
                    </ListGroup>                
                </Col>

                { 
                    this.props.availableDesks.length === 0 && 
                    <Col xs="12" md="6" className="deskbooking__user-addbooking">
                        <Button color="light" size="lg" className="deskbooking__button" onClick={this.toggleFormModal}>Add New Booking</Button>
                    </Col>
                }

                {
                    this.props.availableDesks.length > 0 &&
                    <Col xs="12" md="6" className="deskbooking__user-bookings">
                        <ListGroup>
                            <ListGroupItem className="deskbooking__myBookings-title">
                                <ListGroupItemText>
                                    Available Desks
                                </ListGroupItemText>
                            </ListGroupItem>
                            {
                                this.props.availableDesks.map( ( desk ) => {
                                    return( 
                                    <ListGroupItem>
                                        <ListGroupItemHeading>
                                            {`Campus Name : ${desk.campusName}, Building : ${desk.buildingName}`}
                                        </ListGroupItemHeading>                           
                                        <ListGroupItemText>
                                            {`Desk ID : '${desk.deskId}', Desk Name : '${desk.deskName}', Floor : '${desk.floorName}'`}
                                        </ListGroupItemText>
                                        <Row className="justify-content-between">
                                            <Col>
                                                { desk.fromTime && 
                                                    <small>
                                                        From : { desk.fromTime }
                                                    </small>                                                  
                                                }
                                            </Col>
                                            <Col>
                                                { desk.fromTime && desk.toTime &&
                                                    <small>
                                                        To : { desk.toTime }
                                                    </small>
                                                }
                                            </Col>
                                        </Row> 
                                    </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>                
                    </Col> 
                }

            </Row>
        )

    }

    toggleFormModal = () => {
        this.setState({
            isFormOpen : !this.state.isFormOpen
        })
    }

    submitBooking = () => {

    }

    checkAvailability = ( e ) => {

        e.preventDefault();
        e.persist();

        this.props.dispatch( getAvailableDesks(
            {
                token : this.props.auth.sessionToken,
                campusId : this.state.currentCampusId,
                buildingId : this.state.currentBuildingId,
                floorId : this.state.currentFloorId,
                fromTime : this.state.fromTime.format( "YYYY-MM-DD HH:mm:ss" ),
                toTime : this.state.toTime.format( "YYYY-MM-DD HH:mm:ss" )
            }
        ));

        this.setState({
            currentCampus : "Select a campus",
            currentCampusId : "",
            currentBuilding : "Select a floor",
            currentBuildingId : "",
            currentFloor : "Select a floor",
            currentFloorId : "",
            fromTime : "",
            toTime : "",
        })

    }

    handleCampusChange = ( e ) => {

        e.preventDefault();
        e.persist();
        
        this.props.campuses.map( ( campus ) => {

            if( campus.campusId == e.target.value ){

                this.setState({ 
                    currentCampus : campus.campusName,
                    currentCampusId : e.target.value
                });

            }

        })
    
    }

    handleFloorChange = ( e ) => {

        e.preventDefault();
        e.persist();

        this.props.floors.map( ( floor ) => {

            if( floor.floorId == e.target.value ){

                this.setState( () => ({ 
                    currentFloor : floor.floorName,
                    currentFloorId : e.target.value
                }));

            }

        })
    
    }

    handleBuildingChange = ( e ) => {

        e.preventDefault();
        e.persist();

        this.props.buildings.map( ( building ) => {

            if( building.buildingId == e.target.value ){

                this.setState( () => ({ 
                    currentBuilding : building.buildingName,
                    currentBuildingId : e.target.value
                }));

            }

        })
    
    }

    resizeDeskBookingPage = () => {

        const deskBookingDiv = document.getElementById( "deskBookingDiv" );

        if ( deskBookingDiv ){
            this.setState( {
                minHeight: window.innerHeight,
                contentMinHeight : window.innerHeight - ( 75 + 50 + 60 )
            });     
        }
        
    }

    onSelectFromTime = ( time ) => {
        this.setState({
            fromTime: time
        });
    }

    onSelectToTime = ( time ) => {

        this.setState({
            toTime: time
        });
    }

    componentDidUpdate( prevProps ) {

        if ( this.props.availableDesks !== prevProps.availableDesks && this.props.availableDesks.length > 0 ) {

            console.log("Component did update and changing state");

            this.setState({
                isFormOpen : false
            })

        }

    }

    render(){

        window.addEventListener( 'resize', this.resizeDeskBookingPage );

        return( 
            <div id="deskBookingDiv" className = "deskbooking__container" style={{ minHeight: this.state.minHeight, maxHeight: this.state.minHeight }}> 

                <Container>
                    <Row className="justify-content-center">
                        <Col xs="11" md="2" className="text__align-center">
                            <img src={ DeskBookingLogo } className="deskbooking__action-icon"/>
                        </Col>
                    </Row>
                    
                    <div style={{ minHeight: this.state.contentMinHeight, maxHeight: this.state.contentMinHeight, width:"100%", height: this.state.contentMinHeight}} className="deskbooking__content-section">
                    {
                        this.renderMainContent()
                    }
                    </div>

                    <Row className="justify-content-center">
                        <Col xs="8" className="text__align-center">
                            <img src={TCSLogo} className="deskbooking__image"/>
                        </Col>
                    </Row>

                </Container>

                <Modal isOpen={ this.state.isFormOpen } toggle={ this.toggleFormModal } className = "modal-dialog" size="lg">
                    <ModalBody className = "mx-auto deskbooking__modal-body" >
                        <Form onSubmit = { this.checkAvailability } className = "mx-auto deskbooking__form text__align-center">
                            
                            {/*Campus Select*/}
                            <FormGroup >
                                <FormText color="warning" className = "deskbooking__form-text">
                                    Campus:
                                </FormText>
                                <Input 
                                    type="select" 
                                    name="campuses" 
                                    id="campuses" 
                                    onChange = { this.handleCampusChange } 
                                    className = "deskbooking__form-input"
                                >   
                                        <option value = "Select a campus" >Select a campus</option>
                                    {
                                        this.props.campuses.map(( campus ) => {
                                            return <option value = { campus.campusId } >{ campus.campusName }</option>
                                        })
                                    }
                                    
                                </Input>
                            </FormGroup>
                            
                            {/*Building Select*/}
                            <FormGroup >
                                <FormText color="warning" className = "deskbooking__form-text">
                                    Building:
                                </FormText>
                                <Input 
                                    type="select" 
                                    name="buildings" 
                                    id="buildings"
                                    onChange = { this.handleBuildingChange } 
                                    className = "deskbooking__form-input"
                                >
                                    <option value = "Select a building" >Select a building</option>
                                    {
                                        this.props.buildings.map(( building ) => {

                                            if( building.campusId == this.state.currentCampusId ){
                                                return <option value = { building.buildingId } >{ building.buildingName }</option>
                                            }
                                        })
                                    }
                                </Input>
                            </FormGroup>

                            {/*Floor Select*/}
                            <FormGroup >
                                <FormText color="warning" className = "deskbooking__form-text">
                                    Floor:
                                </FormText>
                                <Input 
                                    type="select" 
                                    name="floors" 
                                    id="floors"
                                    onChange = { this.handleFloorChange } 
                                    className = "deskbooking__form-input"
                                >
                                    <option value = "Select a floor" >Select a floor</option>
                                    {
                                        this.props.floors.map(( floor ) => {
                                            if( floor.buildingId == this.state.currentBuildingId ){
                                                return <option value = { floor.floorId } >{ floor.floorName }</option>
                                            }
                                        })
                                    }
                                </Input>
                            </FormGroup>
                            
                            {/*From Date Select*/}
                            <FormGroup>
                                <FormText color="warning" className="deskbooking__form-text" >
                                    From:
                                </FormText>
                                <DatePicker
                                    utcOffset=""
                                    selected={this.state.fromTime}
                                    onChange={this.onSelectFromTime}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    todayButton={"Today"}
                                    locale="en-in"
                                    placeholderText="Click to enter"
                                    dateFormat="LLL"
                                    className = "deskbooking__form-input"
                                />
                            </FormGroup>

                            {/*To Date Select*/}
                            <FormGroup>
                                <FormText color="warning" className="deskbooking__form-text" >
                                    To:
                                </FormText>
                                <DatePicker
                                    selected={this.state.toTime}
                                    onChange={this.onSelectToTime}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    todayButton={"Today"}
                                    locale="en-in"
                                    placeholderText="Click to enter"
                                    dateFormat="LLL"
                                    className = "deskbooking__form-input"
                                />
                            </FormGroup>

                            {/*Mandatory Note*/}
                            {
                                ( this.state.currentCampusId === "" || this.state.fromTime === "" || this.state.toTime === "" ) &&
                                <FormGroup>               
                                    <FormText color="muted" >
                                        Campus name and timings are Mandatory! 
                                    </FormText>
                                </FormGroup>
                            }
                            
                            {/*Check Button*/}
                            <FormGroup className = "text__align-center">
                                <Col>
                                    <Button 
                                        color="danger" 
                                        size="lg"
                                        disabled={ this.state.currentCampusId === "" || this.state.fromTime === "" || this.state.toTime === "" }
                                    >
                                        Check Availability
                                    </Button>
                                </Col>
                            </FormGroup>

                        </Form> 
                    </ModalBody>
                    <ModalFooter className="greeting__footer">
                        <button type="button" class="close" aria-label="Close" color="primary" onClick={ this.toggleFormModal } >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </ModalFooter>
                </Modal>
                
            </div> 
        );
    }

}

const mapStateToProps = ( store ) => {

    return {
        services : store.services,
        auth : store.auth,
        campuses : store.campuses,
        buildings : store.buildings,
        floors : store.floors,
        myBookings : store.myBookings,
        availableDesks : store.availableDesks
    }

}

export default connect( mapStateToProps )( DeskBooking );

/*
bookedBy:null
buildingName:"Level5"
campusName:"Ayyappa-Central"
deskId:56
deskName:"Desk-A1"
floorId:"78"
floorMap:"resources/img/Ayyappa_Central/Level5/Nipun-IT/NipunFloorIT.jpg"
floorName:"Nipun-IT"
fromTime:null
toTime:null
zonesId:"121"
zonesName:"ConferenceRoom1"*/