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
import { startServiceLogin, resetAuth } from "../actions/auth";
import LoaderIcon from "../../public/images/loader.svg";
import { connect } from "react-redux";

class LoginScreen extends React.Component {

    state = {
        employeeId : "",
        employeeEmail : "",
        employeePassword : "",
        showIdSection : false,
        showEmailSection : false,
        makingServiceLogin : false,
        loginSubmitted : false
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

        this.props.dispatch( resetAuth() );

        this.props.dispatch( startServiceLogin({
            id : this.state.employeeId,
            userName : this.state.employeeEmail,
            password : this.state.employeePassword
        }));

        this.setState({
            employeeId : "",
            employeeEmail : "",
            employeePassword : "",
            loginSubmitted : true
        });

    }

    render(){
        return(

            <Row className="justify-content-center deskbooking__login-row">

                {/*Login Icons*/}
                <Col xs="3" onClick={this.showEmailSection} className="text__align-center" >
                    <FaAt size={40} color = {this.state.showEmailSection ? "#776869" : "#504a4b" }/>
                </Col>
                <Col xs="3" onClick={this.showIdSection} className="text__align-center" >
                    <MdPerson size={40} color ={this.state.showIdSection ? "#776869" : "#504a4b" }/>
                </Col>

                {/*Login using Employee ID*/}
                {
                    this.state.showIdSection && 
                    <Row className="justify-content-center deskbooking__login-credentials">
                        <Form onSubmit = { this.makeServiceLogin }>
                            <FormGroup>
                                <FormText className="text__align-center deskbooking__login-text" color="#FBB429">
                                    EMPLOYEE ID
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
                            <FormGroup className="deskbooking__login-section" >
                                <FormText className="text__align-center deskbooking__login-text" color="#FBB429">
                                    USER
                                </FormText>
                                <Input className="deskbooking__login-input-box text__align-center" type="text" name="employeeId" value = { this.state.employeeEmail } onChange={ ( e ) => { this.handleEmployeeLoginDetails( e, "employeeEmail" ) } } />
                            </FormGroup>
                            <FormGroup className="deskbooking__login-section">
                                <FormText className="text__align-center deskbooking__login-text" color="#FBB429">
                                    PASSWORD
                                </FormText>
                                <Input className="deskbooking__login-input-box text__align-center" type="password" name="employeeId" value = { this.state.employeePassword } onChange={ ( e ) => { this.handleEmployeeLoginDetails( e, "employeePassword" ) } } />
                            </FormGroup>
                            <Container>
                                <Row className = "justify-content-center">
                                    <FormGroup>
                                        <Col xs="12" className="text__align-center deskbooking__login-enter" >
                                            <Button color="danger" size="lg" >Login</Button>
                                        </Col>
                                    </FormGroup>
                                </Row>
                            </Container>
                        </Form> 
                    </Row>
                }
                
                {/*Loader Image*/}
                { this.state.loginSubmitted && this.props.auth && this.props.auth.loginStatus === "" && 
                    <Col xs="12" onClick={this.showIdSection} className="text__align-center" >
                        <img className="loader__png" src= { LoaderIcon } />
                    </Col>                
                }

                {/*Login Status Message*/}
                { this.props.auth && this.props.auth.loginStatus === "2" &&
                    <Col xs="12" onClick={this.showIdSection} className="text__align-center" >
                        Incorrect credentials! Please try again.
                    </Col>                
                }
                { this.props.auth && this.props.auth.loginStatus === "1" &&
                    <Col xs="12" onClick={this.showIdSection} className="text__align-center" >
                        Success!
                    </Col>                
                }
                { this.props.auth && this.props.auth.loginStatus === "5" &&
                    <Col xs="12" onClick={this.showIdSection} className="text__align-center" >
                        Network Error! Please try after some time.
                    </Col>                
                }

            </Row>
        )
    }
}

const mapStateToProps = ( store ) => {
    return {
        auth : store.auth
    }
}

export default connect( mapStateToProps )( LoginScreen );