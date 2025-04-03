import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import './Auth.css';

function SignIn() {
//   const responseGoogle = (response) => {
//     console.log(response); // Handle the response (e.g., send to backend)
//     const { profileObj } = response;
//     console.log('User signed in with Google:', profileObj);
//   };

//   const handleFailure = (error) => {
//     console.error('Google Sign-In failed:', error);
//   };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form id="signin-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign In</button>
      </form>

      {/* <div className="google-auth">
        <p>Or sign in with Google</p>
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google Client ID
          buttonText="Sign In with Google"
          onSuccess={responseGoogle}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div> */}

      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
}

export default SignIn;