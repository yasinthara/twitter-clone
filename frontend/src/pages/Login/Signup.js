// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserAuth } from "../../context/UserAuthContext";
// import twitterimg from "../../image/twitter.jpeg";
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleButton from "react-google-button";
// import "./Login.css"


// const Signup = () => {
//     const [username, setUsername] = useState(" ");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");
//     const [password, setPassword] = useState("");
//     const { signUp } = useUserAuth();
//     const { googleSignIn } = useUserAuth();
//     let navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         try {
//             await signUp(email, password);
//             const user = {
//                 username: username,
//                 name: name,
//                 email: email,
//             }

//             fetch('https://pacific-peak-30751.herokuapp.com/register', {
//                 method: "POST",
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 body: JSON.stringify(user),
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     if (data.acknowledged) {
//                         console.log(data)
//                         navigate('/')
//                     }
//                 })

//         } catch (err) {
//             setError(err.message);
//             window.alert(err.message);
//         }
//     };

//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             await googleSignIn();
//             navigate("/");
//         } catch (error) {
//             console.log(error.message);
//             console.log(error);
//         }
//     };

//     return (

//         <>
//             <div className="login-container">

//                 <div className="image-container">
//                     <img className="image" src={twitterimg} alt="twitterImage" />
//                 </div>


//                 <div className="form-container">
//                     <div className="">
//                         <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />

//                         <h2 className="heading">Happening now</h2>

//                         <div class="d-flex align-items-sm-center">
//                             <h3 className="heading1"> Join twitter today </h3>
//                         </div>


//                         {error && <p className="errorMessage">{error}</p>}
//                         <form onSubmit={handleSubmit}>

//                             <input className="display-name" style={{ backgroudColor: "red" }}
//                                 type="username"
//                                 placeholder="@username "
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />

//                             <input className="display-name" style={{ backgroudColor: "red" }}
//                                 type="name"
//                                 placeholder="Enter Full Name"
//                                 onChange={(e) => setName(e.target.value)}
//                             />

//                             <input className="email"
//                                 type="email"
//                                 placeholder="Email address"
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />



//                             <input className="password"
//                                 type="password"
//                                 placeholder="Password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />


//                             <div className="btn-login">
//                                 <button type="submit" className="btn">Sign Up</button>
//                             </div>
//                         </form>
//                         <hr />
//                         <div className="google-button">
//                             <GoogleButton

//                                 className="g-btn"
//                                 type="light"

//                                 onClick={handleGoogleSignIn}
//                             />
//                         </div>
//                         <div>
//                             Already have an account?
//                             <Link
//                                 to="/login"
//                                 style={{
//                                     textDecoration: 'none',
//                                     color: 'var(--twitter-color)',
//                                     fontWeight: '600',
//                                     marginLeft: '5px'
//                                 }}
//                             >
//                                 Log In
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };

// export default Signup;



//import { auth } from "../../context/firebase";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserAuth } from "../../context/UserAuthContext";
// import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
// import twitterimg from "../../image/twitter.jpeg";
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleButton from "react-google-button";
// import "./Login.css";

// const Signup = () => {
//     const [username, setUsername] = useState("");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [otp, setOtp] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [verificationId, setVerificationId] = useState(null);
//     const { signUp, googleSignIn } = useUserAuth();
//     const navigate = useNavigate();

//     const setupRecaptcha = () => {
//         window.recaptchaVerifier = new RecaptchaVerifier(
//             "recaptcha-container",
//             {
//                 size: "invisible",
//                 callback: (response) => {
//                     handlePhoneSignIn();
//                 },
//             },
//             auth
//         );
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         try {
//             await signUp(email, password);
//             setupRecaptcha();
//             handlePhoneSignIn();
//         } catch (err) {
//             setError(err.message);
//             window.alert(err.message);
//         }
//     };

//     const handlePhoneSignIn = async () => {
//         const phoneNumberWithCountryCode = "+91" + phoneNumber; // Adjust based on your country code
//         const appVerifier = window.recaptchaVerifier;
//         try {
//             const confirmationResult = await signInWithPhoneNumber(
//                 auth,
//                 phoneNumberWithCountryCode,
//                 appVerifier
//             );
//             setVerificationId(confirmationResult.verificationId);
//         } catch (error) {
//             setError(error.message);
//             window.alert(error.message);
//         }
//     };

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();
//         const credential = PhoneAuthProvider.credential(
//             verificationId,
//             otp
//         );
//         try {
//             await signInWithCredential(auth, credential);
//             const user = {
//                 username: username,
//                 name: name,
//                 email: email,
//                 phoneNumber: phoneNumber,
//             };

//             fetch('https://pacific-peak-30751.herokuapp.com/register', {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(user),
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     if (data.acknowledged) {
//                         console.log(data);
//                         navigate('/');
//                     }
//                 });
//         } catch (error) {
//             setError(error.message);
//             window.alert(error.message);
//         }
//     };

//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             await googleSignIn();
//             navigate("/");
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     return (
//         <>
//             <div className="login-container">
//                 <div className="image-container">
//                     <img className="image" src={twitterimg} alt="twitterImage" />
//                 </div>

//                 <div className="form-container">
//                     <div className="">
//                         <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />
//                         <h2 className="heading">Happening now</h2>

//                         <div className="d-flex align-items-sm-center">
//                             <h3 className="heading1"> Join twitter today </h3>
//                         </div>

//                         {error && <p className="errorMessage">{error}</p>}
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 className="display-name"
//                                 type="text"
//                                 placeholder="@username"
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />

//                             <input
//                                 className="display-name"
//                                 type="text"
//                                 placeholder="Enter Full Name"
//                                 onChange={(e) => setName(e.target.value)}
//                             />

//                             <input
//                                 className="email"
//                                 type="email"
//                                 placeholder="Email address"
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />

//                             <input
//                                 className="email"
//                                 type="text"
//                                 placeholder="Phone number"
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                             />

//                             <input
//                                 className="password"
//                                 type="password"
//                                 placeholder="Password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />

//                             {/* <div id="recaptcha-container"></div> */}
//                             <div className="btn-login">
//                                 <button type="submit" className="btn">
//                                     Sign Up
//                                 </button>
//                             </div>
//                         </form>
//                         <hr />
//                         <div className="google-button">
//                             <GoogleButton
//                                 className="g-btn"
//                                 type="light"
//                                 onClick={handleGoogleSignIn}
//                             />
//                         </div>
//                         <div>
//                             Already have an account?
//                             <Link
//                                 to="/login"
//                                 style={{
//                                     textDecoration: 'none',
//                                     color: 'var(--twitter-color)',
//                                     fontWeight: '600',
//                                     marginLeft: '5px'
//                                 }}
//                             >
//                                 Log In
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 {verificationId && (
//                     <form onSubmit={handleOtpSubmit}>
//                         <input
//                             type="text"
//                             className="otp"
//                             placeholder="Enter OTP"
//                             onChange={(e) => setOtp(e.target.value)}
//                         />
//                         <button type="submit" className="btn">
//                             Verify OTP
//                         </button>
//                     </form>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Signup;


import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../context/firebase";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleButton from "react-google-button";
import "./Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const { signUp, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const setupRecaptcha = () => {
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          handlePhoneSignIn();
        },
      },
      auth
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      setupRecaptcha();
      handlePhoneSignIn();
    } catch (err) {
      setError(err.message);
      window.alert(err.message);
    }
  };

  const handlePhoneSignIn = async () => {
    const phoneNumberWithCountryCode = "+91" + phoneNumber; // Adjust based on your country code
    const appVerifier = recaptchaVerifierRef.current;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier);
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      await signInWithCredential(auth, credential);
      const user = {
        username: username,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      };

      fetch('https://pacific-peak-30751.herokuapp.com/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            console.log(data);
            navigate('/');
          }
        });
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img className="image" src={twitterimg} alt="twitterImage" />
        </div>

        <div className="form-container">
          <div className="form-box">
            <TwitterIcon style={{ color: "skyblue" }} />
            <h2 className="heading">Happening now</h2>

            <div className="d-flex align-items-sm-center">
              <h3 className="heading1">Join Twitter today</h3>
            </div>

            {error && <p className="errorMessage">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                className="display-name"
                type="text"
                placeholder="@username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="display-name"
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="email"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="email"
                type="text"
                placeholder="Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                className="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div id="recaptcha-container"></div>
              <div className="btn-login">
                <button type="submit" className="btn">
                  Sign Up
                </button>
              </div>
            </form>
            <hr />
            <div className="google-button">
              <GoogleButton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignIn}
              />
            </div>
            <div>
              Already have an account?
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                  color: 'var(--twitter-color)',
                  fontWeight: '600',
                  marginLeft: '5px'
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

        {verificationId && (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              className="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" className="btn">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Signup;