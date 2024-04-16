import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';

import Home from './Home';

Amplify.configure({
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: 'eu-central-1_aIFOMMkQH',
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: '3ggo2qh0i6800d3au7r59ti8ne',
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: 'code', // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: 'your_cognito_domain',
          scopes: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin'
          ],
          redirectSignIn: ['http://localhost:3000/'],
          redirectSignOut: ['http://localhost:3000/'],
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
          // responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
      }
    }
  }
});

// You can get the current config object
const currentConfig = Amplify.getConfig();

//old v1

// export function App({ signOut, user }: WithAuthenticatorProps) {

//   return (
//     <>
//       <h1>Hello {user?.username}</h1>
//       <button onClick={signOut}>Sign out</button>
//     </>
//   );
// }


export function Auth({ signOut, user, handleUserId }: WithAuthenticatorProps & { handleUserId: any }) {
  
useEffect(() => {
  sendDataToParent();
}, [user, handleUserId])

  const sendDataToParent = () => {
    const data: undefined | string = user?.username;
    if (data) {
      handleUserId(data)
    }
  };

  return (
    <>
      {/* <h1>Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button> */}

      <Home/>
      <div className="flex-center">
      <button style={{}} onClick={signOut}>Sign out</button> 
      </div>
    </>
  );
}

export default withAuthenticator(Auth);