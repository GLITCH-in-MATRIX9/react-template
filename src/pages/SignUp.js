import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import './Auth.css';

function SignUp() {
//   const responseGoogle = (response) => {
//     console.log(response); // Handle the response (e.g., send to backend)
//     const { profileObj } = response;
//     console.log('User signed up with Google:', profileObj);
//   };

//   const handleFailure = (error) => {
//     console.error('Google Sign-Up failed:', error);
//   };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form id="signup-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign Up</button>
      </form>

      {/* <div className="google-auth">
        <p>Or sign up with Google</p>
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google Client ID
          buttonText="Sign Up with Google"
          onSuccess={responseGoogle}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div> */}

      <p>Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
}

export default SignUp;