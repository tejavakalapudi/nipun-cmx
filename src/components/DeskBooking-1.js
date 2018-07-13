import React from "react";
import DeskBookingLogo from "../../public/images/201559.svg";
import TCSLogo from "../../public/images/TATA_Consultancy_services_logo_white.png";
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
import { startServiceLogin } from "../actions/services";
import { connect } from "react-redux";
import LoadingComponent from "./LoadingPage";

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
        isFormOpen : false
    }

    handleEmployeeLogin = (e) => {

        e.preventDefault();
        e.persist();

        this.setState({
            employeeId : e.target.value
        });
    }

    handleEmployeeEmail = (e) => {

        e.preventDefault();
        e.persist();

        this.setState({
            employeeEmail : e.target.value
        });
    }

    handleEmployeePassword = (e) => {

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

    makeServiceLogin = () => {

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
                    <Col xs="2" onClick={this.showEmailSection} className="text__align-center" >
                        <FaAt size={40} color = {this.state.showEmailSection ? "white" : "#ffc107"}/>
                    </Col>
                    <Col xs="2" onClick={this.showIdSection} className="text__align-center" >
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
                                        <Col xs="11" className="text__align-center deskbooking__login-enter" >
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
                                            <Col xs="11" className="text__align-center deskbooking__login-enter" >
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

        if( this.state.makingServiceLogin && this.props.services.loginStatus !== "1" && this.props.services.loginStatus !== "2" ){

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
                <Col xs="12" md="6" className="deskbooking__user-addbooking">
                    <Button color="light" size="lg" className="deskbooking__button" onClick={this.toggleFormModal}>Add New Booking</Button>
                </Col>
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

    handleCampusChange = ( e ) => {

        e.preventDefault();
        e.persist();
        
        this.props.services.campuses.map( ( campus ) => {

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

        this.props.services.floors.map( ( floor ) => {

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

        this.props.services.buildings.map( ( building ) => {

            if( building.buildingId == e.target.value ){

                this.setState( () => ({ 
                    currentBuilding : building.buildingName,
                    currentBuildingId : e.target.value
                }));

            }

        })
    
    }

    render(){
        return( 
            <div className = "deskbooking__container" style={{ minHeight: this.state.minHeight }}> 

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
                        <Col xs="6" className="text__align-center">
                            <img src={TCSLogo} className="deskbooking__image"/>
                        </Col>
                    </Row>

                </Container>

                <Modal isOpen={ this.state.isFormOpen } toggle={ this.toggleFormModal } className = "modal-dialog" size="lg">
                    <ModalBody className = "mx-auto" >
                        <Form onSubmit = { this.submitBooking }>
                            
                            {/*Campus Select*/}
                            <FormGroup >
                                <FormText color="warning">
                                    Campus:
                                </FormText>
                                <Input 
                                    type="select" 
                                    name="campuses" 
                                    id="campuses"
                                    value = { this.state.currentCampus }  
                                    onChange = { this.handleCampusChange } 
                                    className = "contact_input"
                                >   
                                        <option value = "Select a campus" >Select a campus</option>
                                    {
                                        this.props.services.campuses.map(( campus ) => {
                                            return <option value = { campus.campusId } >{campus.campusName}</option>
                                        })
                                    }
                                    
                                </Input>
                            </FormGroup>
                            
                            {/*Building Select*/}
                            <FormGroup >
                                <FormText color="warning">
                                    Building:
                                </FormText>
                                <Input 
                                    type="select" 
                                    name="buildings" 
                                    id="buildings"
                                    onChange = { this.handleBuildingChange } 
                                    className = "contact_input"
                                >
                                    <option value = "Select a building" >Select a building</option>
                                    {
                                        this.props.services.buildings.map(( building ) => {

                                            if( building.campusId == this.state.currentCampusId ){
                                                return <option value = { building.buildingId } >{ building.buildingName }</option>
                                            }
                                        })
                                    }
                                </Input>
                            </FormGroup>

                            {/*Floor Select*/}
                            <FormGroup >
                                <FormText color="warning">
                                    Floor:
                                </FormText>
                                <Input 
                                    type="select" 
                                    name="floors" 
                                    id="floors"
                                    onChange = { this.handleFloorChange } 
                                    className = "contact_input"
                                >
                                    <option value = "Select a floor" >Select a floor</option>
                                    {
                                        this.props.services.floors.map(( floor ) => {
                                            if( floor.buildingId == this.state.currentBuildingId ){
                                                return <option value = { floor.floorId } >{ floor.floorName }</option>
                                            }
                                        })
                                    }
                                </Input>
                            </FormGroup>

                            <div className = "justify-content-center">
                                <FormGroup>
                                    <Col>
                                        <Button color="danger" size="lg" >Submit</Button>
                                    </Col>
                                </FormGroup>
                            </div>

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
        services : store.services
    }

}

export default connect( mapStateToProps )( DeskBooking );