import React from "react";
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
import moment from 'moment';
import { connect } from "react-redux";
import { removeDeskBooking } from "../actions/bookings";

class MyBookings extends React.Component {

    state = {
        isDeleteModalOpen : false,
        activeBookingIndex : 0,
        itemIdToDelete : "",
    }

    showBookingDetails = ( id ) => {

        this.setState({
            activeBookingIndex : id
        })

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

        this.props.dispatch( 
            removeDeskBooking( this.props.auth.sessionToken, this.state.itemIdToDelete ) 
        );
        
        this.deleteModalToggle();

        this.setState({
            itemIdToDelete : ""
        });
    }

    render(){

        return(
            <Col xs="12" md="6" className="deskbooking__user-bookings">
                <ListGroup className="deskbooking__list-group">
                    <ListGroupItem className="deskbooking__myBookings-title">
                        <ListGroupItemText>
                            <span className="deskbooking__myBookings-title-span">My Bookings</span>
                            { 
                                this.props.myBookings && 
                                <Badge color="secondary" pill>{ this.props.myBookings.length }</Badge> 
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
                                </ListGroupItem>
                            )

                        })
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
                </ListGroup>                
            </Col>
        )

    }

}

const mapStateToProps = ( store ) => {

    return {
        myBookings : store.myBookings,
        auth : store.auth
    }

}

export default connect( mapStateToProps )( MyBookings );