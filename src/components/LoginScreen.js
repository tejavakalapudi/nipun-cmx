import React from "react";
import { FaAt } from "react-icons/lib/fa";
import { MdPerson } from "react-icons/lib/md";
import { 
    Row, 
    Container, 
    Col, 
    Button, 
    Input, 
    Form, 
    FormGroup, 
    FormText
} from "reactstrap";
import startServiceLogin from "../actions/auth";

class LoginScreen extends React.Component {

    state = {
        employeeId : "",
        employeeEmail : "",
        employeePassword : "",
        showIdSection : false,
        showEmailSection : false,
        makingServiceLogin : false
    }

    handleEmployeeLoginDetails = ( e, type ) => {

        e.preventDefault();
        e.persist();

        if( type === "employeeId" ){

            this.setState({
                employeeId : e.target.value
            });

        }

        if( type === "employeeEmail" ){
            
            this.setState({
                employeeEmail : e.target.value
            });

        }

        if( type === "employeePassword" ){
            
            this.setState({
                employeePassword : e.target.value
            });

        }

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

        this.props.onSubmit();

        this.setState({
            employeeId : "",
            employeeEmail : "",
            employeePassword : ""
        });

    }

    render(){
        return(
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
                                <Input className="deskbooking__login-input-box text__align-center" type="text" name="employeeId" value = { this.state.employeeId } onChange={ ( e ) => { this.handleEmployeeLoginDetails( e, "employeeId" ) } } />
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
                                <Input className="deskbooking__login-input-box text__align-center" type="text" name="employeeId" value = { this.state.employeeEmail } onChange={ ( e ) => { this.handleEmployeeLoginDetails( e, "employeeEmail" ) } } />
                            </FormGroup>
                            <FormGroup>
                                <FormText className="text__align-center deskbooking__login-text" color="#FBB429">
                                    Password
                                </FormText>
                                <Input className="deskbooking__login-input-box text__align-center" type="password" name="employeeId" value = { this.state.employeePassword } onChange={ ( e ) => { this.handleEmployeeLoginDetails( e, "employeePassword" ) } } />
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
}

export default LoginScreen;