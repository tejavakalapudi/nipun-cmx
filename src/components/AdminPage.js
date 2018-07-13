import React from "react";
import { checkUserAuth } from "../actions/auth";
import { connect } from "react-redux";
import { 
    Button,
    Container, 
    Row, 
    Col, 
    Form, 
    FormGroup, 
    FormText, 
    Input
} from "reactstrap";
import ScrollToTop from "./ScrollToTop";
import { NavLink } from "react-router-dom"; 

class AdminPage extends React.Component {

    state = {
        userName : "",
        password : "",
        message : "Please login to get private access!" || this.props.authInfo.message
    }

    goHome = () => {

        this.props.history.push( "/" );
    }

    onSubmit = ( e ) => { 

        e.preventDefault();

        this.props.dispatch( 
            checkUserAuth( { 
                userName: this.state.userName,
                password: this.state.password
            }) 
        )

        this.setState({
            userName : "",
            password : ""
        });
    }
    
    handleUserNameChange = ( e ) => {

        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { userName : e.target.value } ) );

    }

    handlePasswordChange = ( e ) => {

        e.preventDefault();
        e.persist();
       
        this.setState( () => ( { password : e.target.value } ) );

    }


    render(){
        return ( 
            <div>
                <ScrollToTop />

                <Container>

                    <Row className = "justify-content-center">

                        <Col lg="6" className="admin__form">
                            <Form onSubmit = { this.onSubmit }>
                                <FormGroup className="admin__form-group">
                                    <FormText color="warning">
                                        User:
                                    </FormText>
                                    <Input type="text" name = "userName" value = { this.state.userName } placeholder="John Doe" className = "form__input" onChange={ this.handleUserNameChange } />
                                </FormGroup>
                                <FormGroup className="admin__form-group">
                                    <FormText color="warning">
                                        Password:
                                    </FormText>
                                    <Input type="password" name="password" value = { this.state.password } placeholder="password" className = "form__input" onChange={ this.handlePasswordChange } />
                                </FormGroup>
                                <Row className = "justify-content-center">
                                    <FormGroup>
                                        <Col>
                                            <Button color="danger" size="lg" >Submit</Button>
                                        </Col>
                                    </FormGroup>
                                </Row>

                            </Form> 
                        </Col>  

                    </Row>

                    <Row className = "justify-content-center">

                        <Col xs= "11" className = "admin__message-font text__align-center">
                            { this.props.authInfo.message }
                        </Col>
                        <Col xs= "11" className = "admin__message-font text__align-center">
                            <NavLink to = {"/"} className="admin__home"> Go back to home</NavLink>
                        </Col>
                        
                    </Row>

                </Container>
            
            </div>
        );
    }
  
};

const mapStateToProps = ( store ) => {

    return{
        authInfo : store.authInfo
    };

}

export default connect( mapStateToProps )( AdminPage );