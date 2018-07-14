import React from "react";
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { 
    Row, 
    Container, 
    Col, 
    Button, 
    Input, 
    Form, 
    FormGroup, 
    FormText, 
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import { getAvailableDesks } from "../actions/desks";

class CheckModalAvailability extends React.Component {

    //time format to check availability format("YYYY-MM-DD HH:mm:ss");

    state = {
        currentCampus : "Select a campus",
        currentCampusId : "",
        currentBuilding : "Select a floor",
        currentBuildingId : "",
        currentFloor : "Select a floor",
        currentFloorId : "",
        fromTime : "",
        toTime : "",
        requestSent : false,
        problemInFetchingInfo : false
    }

    checkAvailability = ( e ) => {

        e.preventDefault();
        e.persist();

        this.props.dispatch( getAvailableDesks(
            {
                token : this.props.sessionToken,
                campusId : this.state.currentCampusId,
                buildingId : this.state.currentBuildingId,
                floorId : this.state.currentFloorId,
                fromTime : this.state.fromTime.format( "YYYY-MM-DD HH:mm:ss" ),
                toTime : this.state.toTime.format( "YYYY-MM-DD HH:mm:ss" )
            }
        ));

        // Sending Booking details to deskBooking component for future functionality
        const fromTime = this.state.fromTime.format( "YYYY-MM-DD HH:mm:ss" ),
                toTime = this.state.toTime.format( "YYYY-MM-DD HH:mm:ss" );

                this.props.saveBookingInformation( 
                    this.state.currentCampusId, 
                    this.state.currentBuildingId, 
                    this.state.currentFloorId, 
                    fromTime, 
                    toTime 
                );

        //reseting all the form values for next query
        this.setState({
            currentCampus : "Select a campus",
            currentCampusId : "",
            currentBuilding : "Select a floor",
            currentBuildingId : "",
            currentFloor : "Select a floor",
            currentFloorId : "",
            fromTime : "",
            toTime : "",
            requestSent : true
        });

        setTimeout( () => {

            if( !this.state.problemInFetchingInfo && this.props.isOpen === true ){

                this.setState({ 
                    problemInFetchingInfo: true
                });

            }

        }, 5000);

    }

    reset = () => {
        //reseting all the form values for next query
        this.setState({
            currentCampus : "Select a campus",
            currentCampusId : "",
            currentBuilding : "Select a floor",
            currentBuildingId : "",
            currentFloor : "Select a floor",
            currentFloorId : "",
            fromTime : "",
            toTime : "",
            requestSent : false,
            problemInFetchingInfo: false
        });

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

    render(){
        return(
            <Modal isOpen={ this.props.isOpen } toggle={ this.props.toggle } className = "modal-dialog" size={this.state.requestSent ? "sm" : "lg"}>
                <ModalBody className = "mx-auto deskbooking__modal-body" >
                    { !this.state.requestSent && 
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
                    }

                    { this.state.requestSent && !this.state.problemInFetchingInfo &&
                        <div> Please wait while we gather your information </div>
                    }

                    { this.state.requestSent && this.state.problemInFetchingInfo &&
                        <Container>
                            <Row className="justify-content-center">
                                There is some issue fetching information for the requested criteria.
                                Please check again with a different criteria.
                            </Row>
                            <Row className="justify-content-center">
                                <Button color="danger" size="md" onClick={this.reset}>New Request</Button>
                            </Row>
                        </Container>
                    }


                </ModalBody>
                <ModalFooter>
                    <button type="button" class="close" aria-label="Close" color="primary" onClick={ this.props.toggle } >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalFooter>
            </Modal>
        )

    }

}

const mapStateToProps = ( store ) => {

    return {
        campuses : store.campuses,
        buildings : store.buildings,
        floors : store.floors
    }

}

export default connect( mapStateToProps )( CheckModalAvailability );