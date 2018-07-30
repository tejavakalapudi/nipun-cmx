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

const AvailableDeskItem = ( props ) => (
            
    <ListGroupItem 
        tag="button" 
        onClick = { () => { props.showDeskDetails( props.index ) } }
        className={ `text__align-left deskbooking__availableDesks-item ${ props.activeIndex === props.index && "active__desk" }` }
    >
        <ListGroupItemHeading className= {`deskbooking__availableDesks-heading ${ props.activeIndex === props.index && "active__desk" }`} >
            {`Campus Name : ${ props.desk.campusName }, Building : ${ props.desk.buildingName }`}
        </ListGroupItemHeading>                           
        <ListGroupItemText className={`deskbooking__availableDesks-text ${ props.activeIndex === props.index && "active__desk" }`}>
            {`Desk ID : ${ props.desk.deskId }, Desk Name : ${ props.desk.deskName } on Floor : ${ props.desk.floorName }`}
        </ListGroupItemText>

        { props.desk.zonesId && props.desk.deskName &&
            <Row className="justify-content-between deskbooking__availableDesks-footer">
                <Col>
                    <small className="deskbooking__availableDesks-footer-text">
                        Zone Id : { props.desk.zonesId }
                    </small>  
                </Col>
                <Col>
                    <small className="deskbooking__availableDesks-footer-text">
                        Zone name : { props.desk.zonesName }
                    </small>
                </Col>
            </Row>
        } 

        { props.activeIndex === props.index &&
            <Row className = "deskbooking__booknow-button">
                <Col>
                    <Button 
                        color="danger"
                        size="sm"
                        onClick = {(e) => { 
                            e.preventDefault();
                            props.addDeskBooking( props.desk.deskId ); 
                        }}
                    >
                        Book Now
                    </Button>
                </Col>
            </Row>
        }

    </ListGroupItem>

)

export default AvailableDeskItem;