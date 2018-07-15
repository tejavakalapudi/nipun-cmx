import React from "react";
import DeskBookingLogo from "../../public/images/201559.svg";
import TCSLogo from "../../public/images/TATA_Consultancy_Services_Logo_white.png";
import { 
    Row, 
    Container, 
    Col, 
    Button, 
    Input, 
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
    ModalHeader,
    Badge
} from "reactstrap";
import { FaAt } from "react-icons/lib/fa";
import { MdPerson } from "react-icons/lib/md";
import startServiceLogin from "../actions/auth";
import { connect } from "react-redux";
import LoadingComponent from "./LoadingPage";
import CheckAvailabilityModal from "./CheckAvailabilityModal";
import { addDeskBooking, removeDeskBooking } from "../actions/bookings";
import { getAvailableDesks } from "../actions/desks";
import moment from 'moment';

class DeskBooking extends React.Component {

    state = {
        minHeight : window.innerHeight,
        employeeId : "",
        employeeEmail : "",
        employeePassword : "",
        showIdSection : false,
        showEmailSection : false,
        contentMinHeight : window.innerHeight - ( 75 + 50 + 60 ),
        makingServiceLogin : false,
        isFormOpen : false,
        isDeleteModalOpen : false,
        isAddModalOpen : false,
        activeIndex : 0,
        activeBookingIndex : 0,
        fromTime : "",
        toTime : "",
        campusId : "",
        buildingId : "",
        floorId : "",
        itemIdToDelete : ""
        
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

    toggleFormModal = () => {
        this.setState({
            isFormOpen : !this.state.isFormOpen
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

    componentDidUpdate( prevProps ) {

        if ( this.props.availableDesks !== prevProps.availableDesks && this.props.availableDesks.length > 0 ) {

            this.setState({
                isFormOpen : false
            })

        }

    }

    showDeskDetails = ( id ) => {

        this.setState({
            activeIndex : id
        })

    }

    showBookingDetails = ( id ) => {

        this.setState({
            activeBookingIndex : id
        })

    }

    toggleAddModal = () => {

        this.setState({
            isAddModalOpen : !this.state.isAddModalOpen
        })

    }

    addDeskBooking = ( deskId ) => {

        this.props.dispatch( addDeskBooking( this.props.auth.sessionToken, deskId, this.state.fromTime, this.state.toTime ) );

        this.toggleAddModal();

        this.props.dispatch( getAvailableDesks(
            {
                token : this.props.auth.sessionToken,
                campusId : this.state.campusId,
                buildingId : this.state.buildingId,
                floorId : this.state.floorId,
                fromTime : this.state.fromTime,
                toTime : this.state.toTime
            }
        ));

    }

    deleteModalToggle = ( id ) => {

        if( id ){
            this.setState({
                itemIdToDelete : id
            })
        }

        this.setState({
            isDeleteModalOpen : !this.state.isDeleteModalOpen
        })
    }

    deleteBooking = () => {

        this.props.dispatch( removeDeskBooking( this.props.auth.sessionToken, this.state.itemIdToDelete ) );
        
        this.deleteModalToggle();

        this.setState({
            itemIdToDelete : ""
        });
    }

    saveBookingInformation = ( campusId, buildingId, floorId, fromTime, toTime ) => {

        this.setState({
            campusId,
            buildingId,
            floorId,
            fromTime,
            toTime
        })
    }

    renderMainContent = () => {

        {/*Login Component*/}
        if( !this.state.makingServiceLogin ){
            return (
                <Row className="justify-content-center deskbooking__login-row">

                    {/*Login Icons*/}
                    <Col xs="3" onClick={this.showEmailSection} className="text__align-center" >
                        <FaAt size={40} color = {this.state.showEmailSection ? "white" : "#ffc107"}/>
                    </Col>
                    <Col xs="3" onClick={this.showIdSection} className="text__align-center" >
                        <MdPerson size={40} color ={this.state.showIdSection ? "white" : "#ffc107"}/>
                    </Col>

                    {/*Login using Employee ID*/}
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

                    {/*Login using Username and Password*/}
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

        {/*Loading Component*/}
        if( this.state.makingServiceLogin && this.props.auth && this.props.auth.loginStatus !== "1" && this.props.auth.loginStatus !== "2" ){

            return(
                <LoadingComponent height={ this.state.contentMinHeight } width="100%"/>
            )

        }

        {/*User account*/}
        return (
            <Row className="justify-content-center deskbooking__userSession-row">

                {/*Section to display active bookings*/}
                <Col xs="12" md="6" className="deskbooking__user-bookings">
                    <ListGroup>
                        <ListGroupItem className="deskbooking__myBookings-title">
                            <ListGroupItemText>
                                <span className="deskbooking__myBookings-title-span">My Bookings</span>
                                { 
                                    this.props.myBookings && 
                                    <Badge color="secondary" pill>{this.props.myBookings.length}</Badge> 
                                }
                            </ListGroupItemText>
                        </ListGroupItem>

                        {
                            this.props.myBookings.map( ( booking, index ) => {
                                
                                return(
                                    <ListGroupItem
                                        tag="button"
                                        className={ `text__align-left ${ this.state.activeBookingIndex === index && "deskbooking__myBookings-active" }`}
                                        onClick = { () => { this.showBookingDetails( index ) } } 
                                    >
                                        <ListGroupItemHeading className="deskbooking__myBookings-heading">
                                            Booking ID : {booking.id}
                                        </ListGroupItemHeading>                           
                                        <ListGroupItemText className="deskbooking__myBookings-text">
                                            {`Desk : ${booking.deskName} on Floor : ${booking.floorName}`}
                                        </ListGroupItemText>
                                        <ListGroupItemText className="deskbooking__myBookings-text">
                                            {`Building : ${booking.buildingName}, Campus : ${booking.campusName}`}
                                        </ListGroupItemText>
                                        <Row className="justify-content-between deskbooking__myBookings-footer">
                                            <Col>
                                                <small>
                                                    From : { moment( booking.fromTime ).format( "MMMM Do, h:mm a" ) }
                                                </small>  
                                            </Col>
                                            <Col>
                                                <small>
                                                    To : { moment( booking.toTime ).format( "MMMM Do, h:mm a" ) }
                                                </small>
                                            </Col>
                                        </Row>
                                        
                                        { this.state.activeBookingIndex === index &&
                                            <Row className = "deskbooking__booknow-button">
                                                <Col>
                                                    <Button 
                                                        color="danger"
                                                        size="sm"
                                                        onClick = {(e) => { 
                                                            e.preventDefault();
                                                            this.deleteModalToggle( booking.id ); 
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
                                        <Modal isOpen={ this.state.isDeleteModalOpen } toggle={ this.deleteModalToggle } className = "modal-dialog" size="sm">
                                            <ModalBody className = "mx-auto deskbooking__modal-body" >
                                                {`Are you sure you want to delete the booking with ID: ${this.state.itemIdToDelete}? `}
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button 
                                                    color="primary"
                                                    size="sm"
                                                    onClick = { this.deleteModalToggle }
                                                >
                                                    No! Go back
                                                </Button>
                                                <Button 
                                                    color="danger"
                                                    size="sm"
                                                    onClick = { this.deleteBooking }
                                                >
                                                    Yes! Go ahead
                                                </Button>
                                            </ModalFooter>
                                        </Modal> 
                                    </ListGroupItem>
                                )

                            })
                        }

                    </ListGroup>                
                </Col>
                
                {/*Section to display 'addBooking' button*/}
                { 
                    this.props.availableDesks.length === 0 && 
                    <Col xs="12" md="6" className="deskbooking__user-addbooking">
                        <Button color="light" size="lg" className="deskbooking__button" onClick={this.toggleFormModal}>Add New Booking</Button>
                    </Col>
                }

                {/*Section to display Available Desks*/}
                {
                    this.props.availableDesks.length > 0 &&
                        <Col xs="12" md="6" className="deskbooking__user-bookings">
                            <ListGroup>
                                <ListGroupItem className="deskbooking__myBookings-title">
                                    <ListGroupItemText>
                                        <span className="deskbooking__myBookings-title-span">Available Desks</span>
                                        { 
                                            this.props.availableDesks && 
                                            <Badge color="secondary" pill>{this.props.availableDesks.length}</Badge> 
                                        }
                                    </ListGroupItemText>
                                </ListGroupItem>
                                {
                                    this.props.availableDesks.map( ( desk, index ) => {

                                        return( 
                                            <ListGroupItem 
                                                tag="button" 
                                                onClick = { () => { this.showDeskDetails( index ) } }
                                                className={ `text__align-left deskbooking__availableDesks-item ${ this.state.activeIndex === index && "active__desk" }` }
                                            >
                                                <ListGroupItemHeading className= {`deskbooking__availableDesks-heading ${ this.state.activeIndex === index && "active__desk" }`} >
                                                    {`Campus Name : ${desk.campusName}, Building : ${desk.buildingName}`}
                                                </ListGroupItemHeading>                           
                                                <ListGroupItemText className={`deskbooking__availableDesks-text ${ this.state.activeIndex === index && "active__desk" }`}>
                                                    {`Desk ID : ${desk.deskId}, Desk Name : ${desk.deskName} on Floor : '${desk.floorName}'`}
                                                </ListGroupItemText>

                                                { desk.zonesId && desk.deskName &&
                                                <Row className="justify-content-between deskbooking__availableDesks-footer">
                                                    <Col>
                                                        <small className="deskbooking__availableDesks-footer-text">
                                                        Zone Id : {desk.zonesId}
                                                        </small>  
                                                    </Col>
                                                    <Col>
                                                        <small className="deskbooking__availableDesks-footer-text">
                                                            Zone name : {desk.zonesName}
                                                        </small>
                                                    </Col>
                                                </Row>
                                                } 

                                                { this.state.activeIndex === index &&
                                                    <Row className = "deskbooking__booknow-button">
                                                        <Col>
                                                            <Button 
                                                                color="danger"
                                                                size="sm"
                                                                onClick = {(e) => { 
                                                                    e.preventDefault();
                                                                    this.addDeskBooking( desk.deskId ); 
                                                                }}
                                                            >
                                                                Book Now
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                }

                                                <Modal isOpen={ this.state.isAddModalOpen } toggle={ this.toggleAddModal } className = "modal-dialog" size="sm">
                                                    <ModalBody className = "mx-auto deskbooking__modal-body" >
                                                        Congrats! Your booking has been completed. Please check 'My Bookings' section.
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button 
                                                            color="danger"
                                                            size="sm"
                                                            onClick = { this.toggleAddModal }
                                                        >
                                                            Close
                                                        </Button>
                                                    </ModalFooter>
                                                </Modal>

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

    render(){

        window.addEventListener( 'resize', this.resizeDeskBookingPage );

        return( 
            <div id="deskBookingDiv" className = "deskbooking__container" style={{ minHeight: this.state.minHeight, maxHeight: this.state.minHeight }}> 

                <Container>
                    
                    {/*Desk-Booking Logo*/}
                    <Row className="justify-content-center">
                        <Col xs="11" md="2" className="text__align-center">
                            <img src={ DeskBookingLogo } className="deskbooking__action-icon"/>
                        </Col>
                    </Row>
                    
                    {/*Container for main content*/}
                    <div style={{ minHeight: this.state.contentMinHeight, maxHeight: this.state.contentMinHeight, width:"100%", height: this.state.contentMinHeight}} className="deskbooking__content-section">
                        {
                            this.renderMainContent()
                        }
                    </div>

                    {/*TCS Logo*/}
                    <Row className="justify-content-center">
                        <Col xs="8" className="text__align-center">
                            <img src={TCSLogo} className="deskbooking__image"/>
                        </Col>
                    </Row>

                </Container>
                
                {/*Modal with check availability form*/}
                <CheckAvailabilityModal 
                    isOpen = { this.state.isFormOpen } 
                    toggle={ this.toggleFormModal }
                    sessionToken={ this.props.auth.sessionToken }
                    saveBookingInformation = { this.saveBookingInformation }
                />
                
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