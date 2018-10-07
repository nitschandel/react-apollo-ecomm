import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

//Components
import Header from '../components/header';
import CustomerHeader from '../components/header/customer-header';
import Sidebar from '../components/sidebar';
import Toastr from '../components/toastr';

//Utils
import {isAuthCookiePresent} from '../utils/auth';

//Actions
import * as UserActions from '../actions/user';

class BaseContainer extends Component {

  componentDidMount() {
    if(isAuthCookiePresent()) {
      this.props.dispatch(UserActions.initialiseUser());
    }
  }

  render() {
    if(window.location.href.indexOf("admin") === -1) {
      return (
        <div>
          <div className="app">
            <CustomerHeader {...this.props}/>
            <div className="app-body">
              <main className="main">
                <div className="container-fluid">
                    {this.props.children}
                </div>
              </main>
            </div>
          </div>
          <Toastr />
        </div>
      );
    }

    if(!isAuthCookiePresent()) {
      return (
        <div>
          {this.props.children}
          <Toastr />
        </div>
      );
    };

    //Do not render anything till user is loaded.
    if(!this.props.user.currentUser) {
      return (<div>
        Loading data
        <Toastr />
      </div>);
    }
    if(window.location.href.indexOf("admin") > -1) {
      return (
        <div>
          <div className="app">
            <Header {...this.props}/>
            <div className="app-body">
              <Sidebar {...this.props}/>
              <main className="main">
                <div className="container-fluid">
                    {this.props.children}
                </div>
              </main>
            </div>
          </div>
          <Toastr />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(BaseContainer));
