// import React from 'react'
// import '../pages.css'
// import Languageoption from "../../context/language-dropdown";
// import {useTranslation} from 'react-i18next';
// import i18next from "i18next";

// function More() {

//     const HandleClick = (e) => {
//         i18next.changeLanguage(e.target.value)
//       };
//     return (
//         <div className='page'>
//             <h2 className='pageTitle'>Welcome to More page</h2>
//             <Languageoption  onChange={(e)=> HandleClick(e)}/>
//         </div>
//     )
// }

// export default More;

import { auth } from "../../context/firebase";
import React, { useState } from 'react';
import '../pages.css';
import LanguageOption from '../../context/language-dropdown';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import {  signInWithPhoneNumber, PhoneAuthProvider } from '../../context/firebase'; // Update with your firebase-config
import TwitterIcon from '@mui/icons-material/Twitter';

function More() {
    const [verificationId, setVerificationId] = useState(null);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const handlePhoneSignIn = async (phoneNumber) => {
        const phoneNumberWithCountryCode = '+91' + phoneNumber; // Adjust based on your country code
        try {
            const appVerifier = new PhoneAuthProvider(auth);
            const confirmationResult = await signInWithPhoneNumber(
                appVerifier,
                phoneNumberWithCountryCode
            );
            setVerificationId(confirmationResult.verificationId);
            setError('');
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError(error.message);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!verificationId) {
            setError('Please enter your phone number first');
            return;
        }
        const credential = PhoneAuthProvider.credential(
            verificationId,
            otp
        );
        try {
            await auth.signInWithCredential(credential);
            i18next.changeLanguage('en'); 
            window.location.href = '/'; // Redirect to home page
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(error.message);
        }
    };

    const handleLanguageChange = (e) => {
        i18next.changeLanguage(e.target.value);
    };

    return (
        <div className='page'>
            <h2 className='pageTitle'>{t('Welcome to More page')}</h2>
            
            <LanguageOption onChange={(e) => handleLanguageChange(e)} />

            {!verificationId && (
                <form className="phone-form" onSubmit={(e) => {
                    e.preventDefault();
                    handlePhoneSignIn('+1234567890'); // Replace with your phone number
                }}>
                    <input
                        type="tel"
                        className="phone-input"
                        placeholder="Enter Phone Number"
                        required
                    />
                    <button type="submit" className="phone-button">Send OTP</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            )}

            {verificationId && (
                <form className="otp-form" onSubmit={handleOtpSubmit}>
                    <input
                        type="text"
                        className="otp-input"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button type="submit" className="otp-button">Verify OTP</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            )}
        </div>
    );
}

export default More;
