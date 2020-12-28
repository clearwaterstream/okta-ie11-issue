import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { AuthService } from 'Services/AuthService';
import Login from 'Auth/Login';
import { Button } from '@material-ui/core';

function LogoutButton(props) {
    return (
        <Button
            variant="contained"
            onClick={() => { AuthService.authClient.signOut() }}
        >
            Logout
        </Button>
    );
}

function Routes() {
    const hist = useHistory();

    function onAuthRequiredHandler() {
        hist.push('/login');
    }

    return (
        <Security oktaAuth={AuthService.authClient} onAuthRequired={onAuthRequiredHandler} >
            <Switch>
                <SecureRoute path="/" exact component={LogoutButton} />
                <Route path="/login" component={Login} />
                <Route path='/implicit/callback' component={LoginCallback} />
            </Switch>
        </Security>
    );
}

function RouterSetup(props) {
    return (
        <Router>
            <Routes />
        </Router>
    );
}

export default RouterSetup;