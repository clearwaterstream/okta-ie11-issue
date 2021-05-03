// IE 11
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'fastestsmallesttextencoderdecoder';
import '@okta/okta-auth-js/polyfill';
// IE 11 -- end

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Startup/RouterSetupOkta';

ReactDOM.render(<App />, document.getElementById('root'))
