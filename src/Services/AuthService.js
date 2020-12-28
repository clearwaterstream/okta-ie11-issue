import { OktaAuth } from '@okta/okta-auth-js';

class AuthService {
    oktaAuth;

    constructor() {
        const oktaConfig = {
            issuer: 'https://dev-997158.okta.com/oauth2/default',
            clientId: '0oaz32yfowzc7krcl4x6',
            redirectUri: window.location.origin + '/implicit/callback',
            tokenManager: {
                expireEarlySeconds: 120
            },
            pkce: true
        };

        this.oktaAuth = new OktaAuth(oktaConfig);
    }
    
    get authClient() {
        return this.oktaAuth;
    }
}

const instance = new AuthService();

export { instance as AuthService }