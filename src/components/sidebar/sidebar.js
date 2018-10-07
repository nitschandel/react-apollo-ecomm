import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
   return this.props.location.pathname.indexOf(routeName) > -1 ? 
          'nav-item nav-dropdown open' : 
          'nav-item nav-dropdown ';
   // return 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {

    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
          <li className={this.activeRoute('/products/')}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-puzzle-piece"></i>Products</a>
              <ul className="nav-dropdown-items pl-lg-2">
                <li className="nav-item">
                  <NavLink to={'/admin'} className="nav-link" activeClassName="active"><i className="fa fa-list-alt"></i>View All</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/admin/products/new'} className="nav-link" activeClassName="active"><i className="fa fa-list-alt"></i>Create New Product</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
