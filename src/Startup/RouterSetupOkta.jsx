import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { AuthService } from 'Services/AuthService';
import Login from 'Auth/Login';
import { Button } from '@material-ui/core';
import { toRelativeUrl } from '@okta/okta-auth-js';

function LogoutButton(props) {
    return (
        <Button
            variant="contained"
            onClick={async () => { await AuthService.authClient.signOut() }}
        >
            Logout
        </Button>
    );
}

function Routes() {
    const hist = useHistory();
    
    function onAuthRequiredHandler(oktaAuth) {
        AuthService.onPreLogin();
        
        hist.push('/login');

        return Promise.resolve();
    }

    function restoreOriginalUri(oktaAuth, originalUri) {
        const newUri = toRelativeUrl(originalUri, window.location.origin);
        
        hist.replace(newUri);
        
        return Promise.resolve();
    }
    
    return (
        <Security oktaAuth={AuthService.authClient} onAuthRequired={onAuthRequiredHandler} restoreOriginalUri={restoreOriginalUri}>
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