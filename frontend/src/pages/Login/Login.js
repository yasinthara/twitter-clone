// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";
// import twitterimg from "../../image/twitter.jpeg";
// import TwitterIcon from '@mui/icons-material/Twitter';
// import "./Login.css";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const { logIn, googleSignIn } = useUserAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         try {
//             await logIn(email, password);
//             navigate("/");
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
//         }
//     };

//     return (
//         <>




//             <div className="login-container">
//                 <div className="image-container">
//                     <img className=" image" src={twitterimg} alt="twitterImage" />
//                 </div>

//                 <div className="form-container">
//                     <div className="form-box" >
//                         <TwitterIcon style={{ color: "skyblue" }} />
//                         <h2 className="heading">Happening now</h2>

//                         {error && <p>{error.message}</p>}
//                         <form onSubmit={handleSubmit}>

//                             <input
//                                 type="email" className="email"
//                                 placeholder="Email address"
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />



//                             <input className="password"
//                                 type="password"
//                                 placeholder="Password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />


//                             <div className="btn-login">
//                                 <button type="submit" className="btn" >Log In</button>
//                             </div>
//                         </form>
//                         <hr />
//                         <div>
//                             <GoogleButton

//                                 className="g-btn"
//                                 type="light"

//                                 onClick={handleGoogleSignIn}
//                             />


//                         </div>
//                     </div>
//                     <div>
//                         Don't have an account?
//                         <Link
//                             to="/signup"
//                             style={{
//                                 textDecoration: 'none',
//                                 color: 'var(--twitter-color)',
//                                 fontWeight: '600',
//                                 marginLeft: '5px'
//                             }}
//                         >
//                             Sign up
//                         </Link>
//                     </div>

//                 </div>


//             </div>


//         </>
//     );
// };

// export default Login;




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../../context/firebase";
// import twitterimg from "../../image/twitter.jpeg";
// import TwitterIcon from '@mui/icons-material/Twitter';
// import "./Login.css";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [otp, setOtp] = useState("");
//     const [error, setError] = useState("");
//     const [verificationId, setVerificationId] = useState(null);
//     const { logIn, googleSignIn } = useUserAuth();
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
//             await logIn(email, password);
//             setupRecaptcha();
//             handlePhoneSignIn();
//         } catch (err) {
//             setError(err.message);
//             window.alert(err.message);
//         }
//     };

//     const handlePhoneSignIn = async () => {
//         const phoneNumberWithCountryCode = "+1" + phoneNumber; // Adjust based on your country code
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
//         const credential = auth.PhoneAuthProvider.credential(
//             verificationId,
//             otp
//         );
//         try {
//             await auth.signInWithCredential(credential);
//             navigate("/");
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
//                     <div className="form-box">
//                         <TwitterIcon style={{ color: "skyblue" }} />
//                         <h2 className="heading">Happening now</h2>

//                         {error && <p>{error.message}</p>}
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 type="email"
//                                 className="email"
//                                 placeholder="Email address"
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             <input
//                                 className="password"
//                                 type="password"
//                                 placeholder="Password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             <input
//                                 className="phone"
//                                 type="text"
//                                 placeholder="Phone number"
//                                 onChange={(e) => setPhoneNumber(e.target.value)}
//                             />
//                             <div id="recaptcha-container"></div>
//                             <div className="btn-login">
//                                 <button type="submit" className="btn">
//                                     Log In
//                                 </button>
//                             </div>
//                         </form>
//                         <hr />
//                         <div>
//                             <GoogleButton className="g-btn" type="light" onClick={handleGoogleSignIn} />
//                         </div>
//                     </div>
//                     <div>
//                         Don't have an account?
//                         <Link
//                             to="/signup"
//                             style={{
//                                 textDecoration: "none",
//                                 color: "var(--twitter-color)",
//                                 fontWeight: "600",
//                                 marginLeft: "5px",
//                             }}
//                         >
//                             Sign up
//                         </Link>
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

// export default Login;


// import React, { useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
// import { useUserAuth } from "../../context/UserAuthContext";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../../context/firebase";
// import twitterimg from "../../image/twitter.jpeg";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [verificationId, setVerificationId] = useState(null);
//   const { logIn, googleSignIn } = useUserAuth();
//   const navigate = useNavigate();
//   const recaptchaVerifierRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await logIn(email, password);
//       setupRecaptcha(); // Moved setupRecaptcha call here after successful login
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const setupRecaptcha = () => {
//     recaptchaVerifierRef.current = new RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: (response) => {
//           handlePhoneSignIn();
//         },
//       },
//       auth
//     );
//   };

//   const handlePhoneSignIn = async () => {
//     const phoneNumberWithCountryCode = "+91" + phoneNumber; // Adjust based on your country code
//     const appVerifier = recaptchaVerifierRef.current;
//     try {
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         phoneNumberWithCountryCode,
//         appVerifier
//       );
//       setVerificationId(confirmationResult.verificationId);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     const credential = auth.PhoneAuthProvider.credential(
//       verificationId,
//       otp
//     );
//     try {
//       await auth.signInWithCredential(credential);
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleGoogleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await googleSignIn();
//       navigate("/");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <>
//       <div className="login-container">
//         <div className="image-container">
//           <img className="image" src={twitterimg} alt="twitterImage" />
//         </div>

//         <div className="form-container">
//           <div className="form-box">
//             <TwitterIcon style={{ color: "skyblue" }} />
//             <h2 className="heading">Happening now</h2>

//             {error && <p>{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 className="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 className="password"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <input
//                 className="email"
//                 type="text"
//                 placeholder="Phone number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//               <div id="recaptcha-container"></div>
//               <div className="btn-login">
//                 <button type="submit" className="btn">
//                   Log In
//                 </button>
//               </div>
//             </form>
//             <hr />
//             <div>
//               <GoogleButton
//                 className="g-btn"
//                 type="light"
//                 onClick={handleGoogleSignIn}
//               />
//             </div>
//           </div>
//           <div>
//             Don't have an account?
//             <Link
//               to="/signup"
//               style={{
//                 textDecoration: "none",
//                 color: "var(--twitter-color)",
//                 fontWeight: "600",
//                 marginLeft: "5px",
//               }}
//             >
//               Sign up
//             </Link>
//           </div>
//         </div>

//         {verificationId && (
//           <form onSubmit={handleOtpSubmit}>
//             <input
//               type="text"
//               className="otp"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button type="submit" className="btn">
//               Verify OTP
//             </button>
//           </form>
//         )}
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../context/firebase";
import twitterimg from "../../image/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let browser = "";
    let os = "";
    let device = "";

    if (/chrome/i.test(ua)) browser = "Chrome";
    else if (/firefox/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua)) browser = "Safari";
    else if (/msie/i.test(ua) || /trident/i.test(ua)) browser = "Internet Explorer";
    else browser = "Unknown";

    if (/windows/i.test(ua)) os = "Windows";
    else if (/mac/i.test(ua)) os = "MacOS";
    else if (/linux/i.test(ua)) os = "Linux";
    else if (/android/i.test(ua)) os = "Android";
    else if (/iphone/i.test(ua) || /ipad/i.test(ua)) os = "iOS";
    else os = "Unknown";

    if (/mobile/i.test(ua)) device = "Mobile";
    else if (/tablet/i.test(ua)) device = "Tablet";
    else device = "Desktop";

    return { browser, os, device };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      const { browser, os, device } = getDeviceInfo();
      //eeconsole.log(Browser: ${browser}, OS: ${os}, Device: ${device});
      handlePhoneSignIn();
    } catch (err) {
      setError(err.message);
    }
  };

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

  const handlePhoneSignIn = async () => {
    const phoneNumberWithCountryCode = "+91" + phoneNumber;
    const appVerifier = recaptchaVerifierRef.current;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier);
      setVerificationId(confirmationResult.verificationId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      await signInWithCredential(auth, credential);
      navigate("/"); // Redirect to home page after successful OTP verification
    } catch (error) {
      setError(error.message);
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

            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="email"
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div id="recaptcha-container"></div>
              <div className="btn-login">
                <button type="submit" className="btn">
                  Log In
                </button>
              </div>
            </form>
            <hr />
            <div>
              <GoogleButton
                className="g-btn"
                type="light"
                onClick={handleGoogleSignIn}
              />
            </div>
          </div>
          <div>
            Don't have an account?
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "var(--twitter-color)",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              Sign up
            </Link>
          </div>
        </div>

        {verificationId && (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              className="otp"
              placeholder="Enter OTP"
              value={otp}
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

export default Login;