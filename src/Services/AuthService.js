import { OktaAuth } from '@okta/okta-auth-js';
import WebStorageHelper from 'Util/WebStorageHelper';

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

    onPreLogin() {
        WebStorageHelper.removeItem('okta-pkce-storage');
        WebStorageHelper.removeFromDisk('okta-pkce-storage');
    }

    async signOut() {
        WebStorageHelper.removeItem('okta-pkce-storage');
        WebStorageHelper.removeFromDisk('okta-pkce-storage');
        
        await this.oktaAuth.signOut();
    }
}

const instance = new AuthService();

export { instance as AuthService }