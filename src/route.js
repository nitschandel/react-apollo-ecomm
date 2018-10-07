'use strict';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import React from 'react';
import cookies from 'js-cookie';

import BaseContainer from './containers/base';
import LoginContainer from './containers/login';
import AdminProductsContainer from './containers/admin-products';
import AdminCreateProductContainer from './containers/admin-create-product';
import AdminEditProductContainer from './containers/admin-edit-product';
import Page404Container from './containers/page-404';
import CustomerDashboardContainer from './containers/customer-dashboard';



//Utils
import * as AuthUtils from './utils/auth';

function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (AuthUtils.isAuthCookiePresent())
        ? <Component {...props} />
        : <Redirect to={{pathname: '/admin/login', state: {from: props.location}}} />}
    />
  );
}



const routes = (
    <Switch>
      <BaseContainer>
        <Switch>
          {/* Customer Paths */}
          <Route exact path="/" component={CustomerDashboardContainer}/>

          {/*Unauthenticated routes*/}
          <Route exact path="/admin/login" component={LoginContainer}/>

          {/*Authenticated routes*/}
          <PrivateRoute exact path="/admin" component={AdminProductsContainer} />
          <PrivateRoute exact path="/admin/products/new" component={AdminCreateProductContainer} />
          <PrivateRoute exact path="/admin/products/:productId" component={AdminEditProductContainer} />

          {/*404 Page route*/}
          <Route path="/*" component={Page404Container}/>
        </Switch>
      </BaseContainer>
    </Switch>
);


export default function configureRoutes() {
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}
