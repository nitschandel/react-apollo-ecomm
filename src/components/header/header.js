import React, {Component} from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle,
  NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';

import * as UserActions from '../../actions/user';
import {connect} from 'react-redux';
import * as URL from '../../constants/url';


class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };

    this.logout = this.logout.bind(this);

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  logout() {
    this.props.dispatch(UserActions.logoutUser());
  }

  render() {

    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>

        <NavbarBrand to={URL.ADMIN_HOME_PAGE}>
          <Link to={URL.ADMIN_HOME_PAGE}>V1.CO</Link>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>

          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>

              <DropdownToggle className="nav-link dropdown-toggle p-4">
                <span>{this.props.user.currentUser.name}</span><br/>
              </DropdownToggle>

              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Header);

