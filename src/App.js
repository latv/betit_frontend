import React from 'react';
import DefaultLayout from 'components/DefaultLayout';
import Login from './pages/Login';
import Register from './pages/Registration';


import { BrowserRouter, Switch } from 'react-router-dom';

import ProtectecteRoute from 'components/ProtectedRoute';
import LoginRoute from 'components/LoginRoute';
import { register } from 'serviceWorker';
const App = () => {
  return (
    <>

      <BrowserRouter>

      <Switch>
        <LoginRoute  exact path="/login" component={Login} />
        <LoginRoute  exact path="/register" component={Register} />
        <ProtectecteRoute path="/" component={DefaultLayout} />
      </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
