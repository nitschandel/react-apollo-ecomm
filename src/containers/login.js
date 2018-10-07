//Vendor import
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Row, Col, InputGroup, Input, Container, CardGroup, Card} from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import { Mutation } from 'react-apollo';

//Constant
import { LOGIN_MUTATION } from '../constants/queries';

//Component
import Loader from '../components/loader';

//Utils
import * as AuthUtils from '../utils/auth';
import * as URL from '../constants/url';

//Actions
import * as UserActions from '../actions/user';


class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    this.state = {
      email: undefined,
      password: undefined
    };
  }

  componentDidMount() {

    if(AuthUtils.isAuthCookiePresent()) {
      console.log('Redirecting');
      window.location.href = URL.ADMIN_HOME_PAGE;
    }

  }

  componentDidUpdate(prevProps) {
    if(!prevProps.user.currentUser && this.props.user.currentUser) {
      //Redirect
      window.location.href = URL.ADMIN_HOME_PAGE;
    }
  }

  login() {
    if(!this.state.email || !this.state.password) {
      toastr.error('', 'Please enter valid email and password');
      return;
    }

    this.props.dispatch(UserActions.authenticateUser(this.state.email, this.state.password));
  }

  updateUser(data){
    this.props.dispatch(UserActions.authenticateUser(data));
  }

  render() {
    let { isAuthInProgress } = this.props.user;
    let { email, password } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs={8}>
              <CardGroup className="mb-0">

                <Card className="p-md-4">
                  <div className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <span className="input-group-addon"><i className="fa fa-user"></i></span>
                      <Input type="text" placeholder="Email" onChange={(e) => {this.setState({email: e.target.value});}}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                      <Input type="password" placeholder="Password" onChange={(e) => {this.setState({password: e.target.value});}}/>
                    </InputGroup>
                    <Row>
                      <Col xs={6}>
                      <Mutation
                          mutation={LOGIN_MUTATION}
                          variables={{ email, password }}
                          onCompleted={data => this.updateUser(data)}
                        >
                        {(mutation) => (
                        <Button type="button" className="btn btn-primary px-4" onClick={mutation}>Login</Button>
                       )}
                      </Mutation>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card inverse color="primary" className="py-5 d-md-down-none" style={{width: 44 + '%'}}>
                  <div className="card-block text-center">
                    <div>
                      <h2>V1.CO</h2>
                      <p>Please contact v1.co for registration.</p>
                    </div>
                  </div>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
        <Loader active={isAuthInProgress} />
      </div>
    );
  };

};


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(LoginContainer);

