import React from "react";
import DeskBookingLogo from "../../public/images/201559.svg";
import TCSLogo from "../../public/images/TATA_Consultancy_Services_Logo_blue.png";
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
    Badge,
    UncontrolledCollapse, CardBody, Card
} from "reactstrap";
import { connect } from "react-redux";
import moment from 'moment';

import LoginScreen from "./LoginScreen";
import MyBookings from "./MyBookings";
import AvailableDeskItem from "./AvailableDeskItem";
import CheckAvailabilityModal from "./CheckAvailabilityModal";

import { addDeskBooking, removeDeskBooking } from "../actions/bookings";
import { setZoneFilter, setBuildingFilter, setFloorFilter } from "../actions/filters";
import { getAvailableDesks } from "../actions/desks";
import selectedDesks from  "../selectors/availableDesks";

class DeskBooking extends React.Component {

    state = {
        minHeight : window.innerHeight,
        contentMinHeight : window.innerHeight - ( 75 + 50 + 60 ),
        isFormOpen : false,
        isAddModalOpen : false,
        fromTime : "",
        toTime : "",
        selectedCampusId : "",
        selectedBuildingId : "",
        selectedFloorId : "",
        activeBuildingName : "",
        activeFloorName : "",
        activeIndex : 0,
        listOfFloors : [],
        listOfBuildings : [],
        listOfZones : [],
        filteredBuilding : "",
        filteredFloor : "",
        filteredZone : ""
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

    showDeskDetails = ( id ) => {

        this.setState({
            activeIndex : id
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
        this.checkAvailableDesks();

    }

    checkAvailableDesks = () => {

        this.props.dispatch( getAvailableDesks(
            {
                token : this.props.auth.sessionToken,
                campusId : this.state.selectedCampusId,
                buildingId : this.state.selectedBuildingId,
                floorId : this.state.selectedFloorId,
                fromTime : this.state.fromTime,
                toTime : this.state.toTime
            }
        ));

    }

    showFloorsByBuildings = ( name ) => {

        this.setState({
            activeBuildingName : name
        })

    }

    showDesksByFloors = ( name ) => {

        this.setState({
            activeFloorName : name
        })


    }

    saveBookingInformation = ( selectedCampusId, selectedBuildingId, selectedFloorId, fromTime, toTime ) => {

        this.setState({
            selectedCampusId,
            selectedBuildingId,
            selectedFloorId,
            fromTime,
            toTime
        })
    }

    componentDidUpdate( prevProps ) {

        if ( this.props.availableDesks !== prevProps.availableDesks && this.props.availableDesks.length > 0 ) {

            this.setState({
                isFormOpen : false
            });

            let listOfBuildings = [], 
            listOfFloors = [],
            listOfZones = []
        
            this.props.availableDesks.forEach( ( desk ) => {

                if( listOfBuildings.indexOf( desk.buildingName ) === -1 ){

                    listOfBuildings.push( desk.buildingName );

                } 

                if( listOfFloors.indexOf( desk.floorName ) === -1 ){

                    listOfFloors.push( desk.floorName );

                } 

                if( listOfZones.indexOf( desk.zonesName ) === -1 ){

                    listOfZones.push( desk.zonesName );

                } 

            });

            this.setState({
                listOfBuildings,
                listOfFloors,
                listOfZones
            });

        }

    }

    filterByBuilding = ( e ) => {

        e.preventDefault();

        this.props.dispatch(
            setBuildingFilter( e.target.value )
        );

        this.setState({
            filteredBuilding : e.target.value
        });

    }

    filterByFloor = ( e ) => {

        e.preventDefault();

        this.props.dispatch(
            setFloorFilter( e.target.value )
        );

        this.setState({
            filteredFloor : e.target.value
        });
        
    }

    filterByZone = ( e ) => {

        e.preventDefault();

        this.props.dispatch(
            setZoneFilter( e.target.value )
        );

        this.setState({
            filteredZone : e.target.value
        });
        
    }

    renderAvailableDesks = () => (

        <Col xs="12" md="6" className="deskbooking__user-bookings">
            <ListGroup className="deskbooking__list-group">

                <ListGroupItem className="deskbooking__myBookings-title">

                    <ListGroupItemText>
                        <span className="deskbooking__myBookings-title-span">Available Desks</span>
                        { 
                            this.props.availableDesks && 
                            <Badge color="secondary" pill>{ this.props.availableDesks.length }</Badge> 
                        }

                        <Button 
                            color = "primary"
                            className = "float__right"
                            onClick={ this.toggleFormModal }
                        >
                            New Query
                        </Button>
                        
                    </ListGroupItemText>
                    
                    <Row className="justify-content-between" >

                        <Col xs="4">
                            <Input 
                                type="select" 
                                name="building"
                                value = { this.state.filteredBuilding }  
                                onChange = { this.filterByBuilding }
                            >
                            <option value = "">Building</option>
                            {
                                this.state.listOfBuildings.map( ( buildingName ) => {
                                    
                                    return ( <option value = { buildingName }>{ buildingName }</option> );

                                })

                            }
                            </Input>                        
                        </Col>

                        <Col xs="4">
                            <Input 
                                type="select" 
                                name="floor"
                                value = { this.state.filteredFloor }  
                                onChange = { this.filterByFloor }
                            >
                            <option value = "">Floor</option>
                            {
                                this.state.listOfFloors.map( ( floor ) => {
                                    
                                    return ( <option value = { floor }>{ floor }</option> );

                                })

                            }
                            </Input>                      
                        </Col>

                        <Col xs="4">
                            <Input 
                                type="select" 
                                name="zone"
                                value = { this.state.filterByZone }  
                                onChange = { this.filterByZone }
                            >
                            <option value = "">Zone</option>
                            {
                                this.state.listOfZones.map( ( zone ) => {
                                    
                                    return ( <option value = { zone }>{ zone }</option> );

                                })

                            }
                            </Input>                    
                        </Col>

                    </Row>

                </ListGroupItem>

                {
                    this.props.availableDesks.map( ( desk, index ) => {

                        return (
                            <AvailableDeskItem 
                                desk = { desk }
                                index = { index }
                                activeIndex = { this.state.activeIndex }
                                addDeskBooking = { this.addDeskBooking }
                                showDeskDetails = { this.showDeskDetails }
                            />
                        )

                    })
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
            </ListGroup>                
        </Col> 

    )

    renderMainContent = () => {

        {/*User account*/}
        {/*Should only render booking screen if user has a successful login*/}
        if( this.props.auth && this.props.auth.loginStatus === "1" ){
            return (
                <Row className="justify-content-center deskbooking__userSession-row">
    
                    {/*Section to display active bookings*/}
                    <MyBookings recheckAvailableDesks = { this.checkAvailableDesks }/> 
    
                    {/*Section to display 'addBooking' button*/}
                    { 
                        this.props.availableDesks.length === 0 && 
                        <Col xs="12" md="6" className="deskbooking__user-addbooking">
                            <Button 
                                color="dark" 
                                size="lg" 
                                className="deskbooking__button" 
                                onClick={ this.toggleFormModal }
                            >
                                Check Availability
                            </Button>
                        </Col>
                    }
    
                    {/*Section to display Available Desks*/}
                    {
                        this.props.availableDesks.length > 0 &&
                        this.renderAvailableDesks()
                    }
    
                </Row>
            )
        }

        {/*Login Component*/}
        return (
            <LoginScreen dispatch = { this.props.dispatch } onSubmit = { this.completeLoginSession }/>
        )

    }

    render(){

        window.addEventListener( "resize", this.resizeDeskBookingPage );

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
        auth : store.auth,
        myBookings : store.myBookings,
        availableDesks : selectedDesks( store.desksInfo.availableDesks, store.filters )
    }

}

export default connect( mapStateToProps )( DeskBooking );