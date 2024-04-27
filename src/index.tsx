import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {LoginSocialFacebook} from "reactjs-social-login";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <LoginSocialFacebook appId={"391694177082242"}
                         onReject={(error) => {
                             console.log(error);
                         }}
                         onResolve={(response) => {
                             console.log(response);
                         }
    }>
        <GoogleOAuthProvider clientId={"582136194652-hept9tjdmb6cpvmb5ma383p1a9si64t2.apps.googleusercontent.com"}>
            <App />
        </GoogleOAuthProvider>
    </LoginSocialFacebook>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
